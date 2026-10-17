// WebAudio manager. Nothing is created or played until unlock() runs from a user gesture.
// Clips load from ./audio/<name>.ogg; a missing or undecodable clip falls back to a synthesized placeholder.

export type Channel = 'chant' | 'music' | 'ambience' | 'sfx';
export const CHANNELS: Channel[] = ['chant', 'music', 'ambience', 'sfx'];

export const CHANT_CLIPS = ['chant_intro', 'chant_ask', 'chant_not_yet', 'chant_open', 'chant_hunt', 'caught'] as const;
export const MUSIC_CLIPS = ['music_drums'] as const;
export const AMBIENCE_CLIPS = ['ambience_a', 'ambience_b'] as const;
export type ClipName = (typeof CHANT_CLIPS)[number] | (typeof MUSIC_CLIPS)[number] | (typeof AMBIENCE_CLIPS)[number];

const CLIP_CHANNEL: Record<ClipName, Channel> = {
  chant_intro: 'chant',
  chant_ask: 'chant',
  chant_not_yet: 'chant',
  chant_open: 'chant',
  chant_hunt: 'chant',
  caught: 'chant',
  music_drums: 'music',
  ambience_a: 'ambience',
  ambience_b: 'ambience',
};

const MUTE_KEY = 'boju.muted';

export interface Voice {
  readonly name: string;
  /** Resolves when the clip finishes or is stopped. */
  readonly ended: Promise<void>;
  stop(fade?: number): void;
}

interface PlayOptions {
  channel?: Channel;
  loop?: boolean;
  volume?: number;
  fadeIn?: number;
}

export type ChantPhase = 'idle' | 'intro' | 'asking' | 'open' | 'hunt';
export type ChantResult = 'ready' | 'timeout' | 'cancelled';

export interface ChantOptions {
  /** Max time spent in the ask/not_yet loop before the chant opens anyway. */
  timeoutMs?: number;
  onPhase?: (phase: ChantPhase) => void;
}

// --- placeholder synthesis ---------------------------------------------------

const PLACEHOLDER_FREQ: Partial<Record<ClipName, number>> = {
  chant_intro: 110,
  chant_ask: 140,
  chant_not_yet: 100,
  chant_open: 170,
  chant_hunt: 200,
  caught: 70,
};

const SR = 44100;

function drumHit(oc: OfflineAudioContext, t: number, freq: number, dur: number, gain: number) {
  const body = oc.createOscillator();
  const bodyGain = oc.createGain();
  body.type = 'sine';
  body.frequency.setValueAtTime(freq * 2, t);
  body.frequency.exponentialRampToValueAtTime(freq, t + 0.08);
  bodyGain.gain.setValueAtTime(gain, t);
  bodyGain.gain.exponentialRampToValueAtTime(0.001, t + dur);
  body.connect(bodyGain).connect(oc.destination);
  body.start(t);
  body.stop(t + dur);

  const slap = oc.createOscillator();
  const slapGain = oc.createGain();
  slap.type = 'triangle';
  slap.frequency.setValueAtTime(freq * 4, t);
  slapGain.gain.setValueAtTime(gain * 0.4, t);
  slapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  slap.connect(slapGain).connect(oc.destination);
  slap.start(t);
  slap.stop(t + 0.06);
}

async function synthPlaceholder(name: ClipName): Promise<AudioBuffer> {
  if (name === 'music_drums') {
    // two bars of 4 hits at 120 bpm
    const dur = 2;
    const oc = new OfflineAudioContext(1, SR * dur, SR);
    [0, 0.5, 1, 1.5].forEach((t, i) => drumHit(oc, t, i % 2 ? 150 : 80, 0.3, 0.8));
    drumHit(oc, 0.75, 180, 0.15, 0.4);
    drumHit(oc, 1.75, 180, 0.15, 0.4);
    return oc.startRendering();
  }
  if (name === 'ambience_a' || name === 'ambience_b') {
    // soft filtered noise; A is lower, B is brighter
    const dur = 4;
    const oc = new OfflineAudioContext(1, SR * dur, SR);
    const noise = oc.createBuffer(1, SR * dur, SR);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const edge = Math.min(i, data.length - i) / (SR * 0.25);
      data[i] = (Math.random() * 2 - 1) * Math.min(1, edge);
    }
    const src = oc.createBufferSource();
    src.buffer = noise;
    const lp = oc.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = name === 'ambience_a' ? 400 : 1400;
    const g = oc.createGain();
    g.gain.value = 0.35;
    src.connect(lp).connect(g).connect(oc.destination);
    src.start();
    return oc.startRendering();
  }
  const oc = new OfflineAudioContext(1, Math.round(SR * 0.4), SR);
  drumHit(oc, 0, PLACEHOLDER_FREQ[name] ?? 120, 0.35, 0.9);
  return oc.startRendering();
}

// --- manager -----------------------------------------------------------------

class AudioManager {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private channelGain = {} as Record<Channel, GainNode>;
  private volumes: Record<Channel, number> = { chant: 1, music: 0.7, ambience: 0.6, sfx: 1 };
  private muted = false;

  private buffers = new Map<string, Promise<AudioBuffer | null>>();
  private warned = new Set<string>();
  private voices = new Set<{ name: string; voice: Voice }>();
  private stopGen = new Map<string, number>();

  private chantToken = 0;
  private chantReadyFlag = false;
  private chantPhase: ChantPhase = 'idle';

  private suspicion = 0;
  private heartTimer: number | null = null;

  constructor() {
    try {
      this.muted = localStorage.getItem(MUTE_KEY) === '1';
    } catch {
      /* storage unavailable: stay unmuted */
    }
  }

  get unlocked(): boolean {
    return this.ctx !== null;
  }

  /** Call from a user gesture (the lobby Play button). Safe to call repeatedly. */
  async unlock(): Promise<void> {
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 1;
      this.master.connect(this.ctx.destination);
      for (const ch of CHANNELS) {
        const g = this.ctx.createGain();
        g.gain.value = this.volumes[ch];
        g.connect(this.master);
        this.channelGain[ch] = g;
      }
    }
    if (this.ctx.state !== 'running') await this.ctx.resume();
  }

  // --- volume / mute

  isMuted(): boolean {
    return this.muted;
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    try {
      localStorage.setItem(MUTE_KEY, muted ? '1' : '0');
    } catch {
      /* ignore */
    }
    if (this.ctx) this.master.gain.setTargetAtTime(muted ? 0 : 1, this.ctx.currentTime, 0.03);
  }

  getVolume(channel: Channel): number {
    return this.volumes[channel];
  }

  setVolume(channel: Channel, volume: number): void {
    this.volumes[channel] = Math.min(1, Math.max(0, volume));
    if (this.ctx) this.channelGain[channel].gain.setTargetAtTime(this.volumes[channel], this.ctx.currentTime, 0.03);
  }

  // --- clips

  private loadBuffer(name: ClipName): Promise<AudioBuffer | null> {
    let p = this.buffers.get(name);
    if (!p) {
      p = this.fetchOrSynth(name);
      this.buffers.set(name, p);
    }
    return p;
  }

  private async fetchOrSynth(name: ClipName): Promise<AudioBuffer | null> {
    if (!this.ctx) return null;
    try {
      const res = await fetch(`./audio/${name}.ogg`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // A dev server may answer a missing file with index.html; decode will reject it.
      return await this.ctx.decodeAudioData(await res.arrayBuffer());
    } catch (err) {
      if (!this.warned.has(name)) {
        this.warned.add(name);
        console.warn(`[audio] ${name}.ogg unavailable (${String(err)}), using synthesized placeholder`);
      }
      try {
        return await synthPlaceholder(name);
      } catch (synthErr) {
        console.warn(`[audio] placeholder for ${name} failed`, synthErr);
        return null;
      }
    }
  }

  /** Fire-and-forget load so the first play has no gap. Needs unlock() first. */
  preload(names: readonly ClipName[]): Promise<unknown> {
    return Promise.all(names.map((n) => this.loadBuffer(n)));
  }

  private async start(name: ClipName, opts: PlayOptions): Promise<Voice | null> {
    const ctx = this.ctx;
    if (!ctx) return null; // locked: nothing plays before the first gesture
    const gen = this.stopGen.get(name) ?? 0;
    const buffer = await this.loadBuffer(name);
    if (!buffer || (this.stopGen.get(name) ?? 0) !== gen) return null; // stop(name) arrived while loading

    const channel = opts.channel ?? CLIP_CHANNEL[name];
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = opts.loop ?? false;
    const gain = ctx.createGain();
    const target = opts.volume ?? 1;
    const now = ctx.currentTime;
    if (opts.fadeIn) {
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(target, now + opts.fadeIn);
    } else {
      gain.gain.value = target;
    }
    src.connect(gain).connect(this.channelGain[channel]);

    let resolveEnded!: () => void;
    const ended = new Promise<void>((r) => (resolveEnded = r));
    const entry = { name, voice: null as unknown as Voice };
    const voice: Voice = {
      name,
      ended,
      stop: (fade = 0) => {
        const t = ctx.currentTime;
        if (fade > 0) {
          gain.gain.cancelScheduledValues(t);
          gain.gain.setValueAtTime(gain.gain.value, t);
          gain.gain.linearRampToValueAtTime(0, t + fade);
          try {
            src.stop(t + fade + 0.02);
          } catch {
            /* already stopped */
          }
        } else {
          try {
            src.stop();
          } catch {
            /* already stopped */
          }
        }
      },
    };
    entry.voice = voice;
    this.voices.add(entry);
    src.onended = () => {
      this.voices.delete(entry);
      src.disconnect();
      gain.disconnect();
      resolveEnded();
    };
    src.start();
    return voice;
  }

  playOnce(name: ClipName, opts: Omit<PlayOptions, 'loop'> = {}): Promise<Voice | null> {
    return this.start(name, { ...opts, loop: false });
  }

  loop(name: ClipName, opts: Omit<PlayOptions, 'loop'> = {}): Promise<Voice | null> {
    return this.start(name, { ...opts, loop: true });
  }

  /** Stop every voice playing this clip, including one that is still loading. */
  stop(name: ClipName, fade = 0): void {
    this.stopGen.set(name, (this.stopGen.get(name) ?? 0) + 1);
    for (const v of [...this.voices]) if (v.name === name) v.voice.stop(fade);
  }

  stopAll(fade = 0): void {
    this.cancelChant();
    this.setSuspicion(0);
    for (const v of [...this.voices]) v.voice.stop(fade);
  }

  /** Fade ambience `a` out and `b` in over `seconds`. */
  async crossfade(a: ClipName, b: ClipName, seconds = 2): Promise<Voice | null> {
    this.stop(a, seconds);
    return this.loop(b, { fadeIn: seconds });
  }

  // --- chant sequencer

  get chantState(): ChantPhase {
    return this.chantPhase;
  }

  /** intro, then loop ask + not_yet until chantReady() or the timeout, then open, then hunt. */
  async startChant(opts: ChantOptions = {}): Promise<ChantResult> {
    if (!this.ctx) return 'cancelled';
    this.cancelChant();
    const token = ++this.chantToken;
    this.chantReadyFlag = false;
    const timeoutMs = opts.timeoutMs ?? 20000;
    const setPhase = (p: ChantPhase) => {
      this.chantPhase = p;
      opts.onPhase?.(p);
    };
    const alive = () => token === this.chantToken;

    // Plays one clip to its end; the ready flag and deadline are checked between clips.
    const play = async (name: ClipName) => {
      const v = await this.playOnce(name);
      if (!v || !alive()) return;
      await v.ended;
    };

    let result: ChantResult = 'timeout';
    const deadline = performance.now() + timeoutMs;
    try {
      setPhase('intro');
      await play('chant_intro');

      setPhase('asking');
      while (alive() && !this.chantReadyFlag && performance.now() < deadline) {
        await play('chant_ask');
        if (!alive() || this.chantReadyFlag || performance.now() >= deadline) break;
        await play('chant_not_yet');
      }
      if (!alive()) return 'cancelled';
      result = this.chantReadyFlag ? 'ready' : 'timeout';

      setPhase('open');
      await play('chant_open');
      if (!alive()) return 'cancelled';
      setPhase('hunt');
      await play('chant_hunt');
      return alive() ? result : 'cancelled';
    } finally {
      if (alive()) setPhase('idle');
    }
  }

  /** The hiding phase is over: finish the current line, then open and hunt. */
  chantReady(): void {
    this.chantReadyFlag = true;
  }

  cancelChant(): void {
    this.chantToken++;
    for (const n of ['chant_intro', 'chant_ask', 'chant_not_yet', 'chant_open', 'chant_hunt'] as const) this.stop(n);
    this.chantPhase = 'idle';
  }

  // --- heartbeat (synthesized live; follows suspicion 0..1)

  /** 0 = silent, 1 = fast and loud. Starts and stops the heartbeat as needed. */
  setSuspicion(value: number): void {
    this.suspicion = Math.min(1, Math.max(0, value));
    if (!this.ctx) return;
    if (this.suspicion <= 0.02) {
      if (this.heartTimer !== null) window.clearTimeout(this.heartTimer);
      this.heartTimer = null;
    } else if (this.heartTimer === null) {
      this.beat();
    }
  }

  private beat(): void {
    const ctx = this.ctx;
    if (!ctx || this.suspicion <= 0.02) {
      this.heartTimer = null;
      return;
    }
    const s = this.suspicion;
    const vol = 0.15 + 0.85 * s;
    const t = ctx.currentTime;
    this.thump(t, 58, vol);
    this.thump(t + 0.17 - 0.05 * s, 46, vol * 0.7);
    const period = 1.1 - 0.75 * s; // ~55 bpm calm, ~170 bpm panicked
    this.heartTimer = window.setTimeout(() => this.beat(), period * 1000);
  }

  private thump(t: number, freq: number, gain: number): void {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 1.6, t);
    osc.frequency.exponentialRampToValueAtTime(freq, t + 0.06);
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    osc.connect(g).connect(this.channelGain.sfx);
    osc.start(t);
    osc.stop(t + 0.18);
    osc.onended = () => g.disconnect();
  }
}

export const audio = new AudioManager();
