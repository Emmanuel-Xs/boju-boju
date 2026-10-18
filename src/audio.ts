// WebAudio manager. Nothing is created or played until unlock() runs from a user gesture.
// Clips load from ./audio/<name>.ogg; a missing or undecodable clip falls back to a synthesized placeholder.

export type Channel = 'chant' | 'music' | 'ambience' | 'sfx';
export const CHANNELS: Channel[] = ['chant', 'music', 'ambience', 'sfx'];

export const CHANT_CLIPS = ['chant_intro', 'chant_ask', 'chant_not_yet', 'chant_open', 'chant_hunt', 'caught'] as const;
export const MUSIC_CLIPS = ['drum_loop'] as const;
export const AMBIENCE_CLIPS = ['amb_market', 'amb_generator'] as const;
export const HORN_CLIPS = ['sfx_horn_motorbike_01', 'sfx_horn_motorbike_02'] as const;
export const SFX_CLIPS = [...HORN_CLIPS, 'sfx_rooster_01', 'sfx_paint', 'jingle_win', 'jingle_caught'] as const;
export type ClipName =
  | (typeof CHANT_CLIPS)[number]
  | (typeof MUSIC_CLIPS)[number]
  | (typeof AMBIENCE_CLIPS)[number]
  | (typeof SFX_CLIPS)[number];

const CLIP_CHANNEL: Record<ClipName, Channel> = {
  chant_intro: 'chant',
  chant_ask: 'chant',
  chant_not_yet: 'chant',
  chant_open: 'chant',
  chant_hunt: 'chant',
  caught: 'chant',
  drum_loop: 'music',
  amb_market: 'ambience',
  amb_generator: 'ambience',
  sfx_horn_motorbike_01: 'sfx',
  sfx_horn_motorbike_02: 'sfx',
  sfx_rooster_01: 'sfx',
  sfx_paint: 'sfx',
  jingle_win: 'sfx',
  jingle_caught: 'sfx',
};

/** Clips that always sound far away unless the caller says `distant: false`. */
const DEFAULT_DISTANT = new Set<ClipName>(HORN_CLIPS);

const MUTE_KEY = 'boju.muted';

export interface Voice {
  readonly name: string;
  /** Length of the clip in seconds. */
  readonly duration: number;
  /** Resolves when the clip finishes or is stopped. */
  readonly ended: Promise<void>;
  stop(fade?: number): void;
  /** Move a spatial voice. No-op for voices started without `spatial`. */
  setPosition(x: number, y: number, z: number): void;
}

export interface SpatialOptions {
  position: { x: number; y: number; z: number };
  /** Distance (m) at which the clip is at full level. Default 2. */
  refDistance?: number;
  /** Distance (m) beyond which it stops getting quieter. Default 30. */
  maxDistance?: number;
  /** How fast it fades with distance. Default 1.5. */
  rolloff?: number;
}

export interface DistantOptions {
  /** Lowpass cutoff in Hz. Default 1200. */
  cutoff?: number;
  /** Level multiplier applied before the filter output. Default 0.45. */
  gain?: number;
  /** Reverb send level. Default 0.35. */
  wet?: number;
  /** Reverb length in seconds. Default 0.6. */
  reverbSeconds?: number;
}

/** Short decaying-noise impulse response for a small outdoor space. */
export function makeImpulse(ctx: BaseAudioContext, seconds = 0.6): AudioBuffer {
  const len = Math.max(1, Math.round(ctx.sampleRate * seconds));
  const ir = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
  }
  return ir;
}

/**
 * input -> lowpass -> quieter -> (dry + convolver reverb) -> output. Returns the nodes so the caller can disconnect them.
 * Works on offline contexts too, which is how it is tested.
 */
export function connectDistant(ctx: BaseAudioContext, input: AudioNode, output: AudioNode, ir: AudioBuffer, o: DistantOptions = {}): AudioNode[] {
  const lowpass = ctx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.value = o.cutoff ?? 1200;
  lowpass.Q.value = 0.7;
  const level = ctx.createGain();
  level.gain.value = o.gain ?? 0.45;
  const dry = ctx.createGain();
  const convolver = ctx.createConvolver();
  convolver.buffer = ir;
  const wet = ctx.createGain();
  wet.gain.value = o.wet ?? 0.35;
  input.connect(lowpass).connect(level);
  level.connect(dry).connect(output);
  level.connect(convolver).connect(wet).connect(output);
  return [lowpass, level, dry, convolver, wet];
}

interface PlayOptions {
  channel?: Channel;
  /** Play through the distance effect (lowpass, lower gain, short reverb). Horn clips default to true. */
  distant?: boolean | DistantOptions;
  loop?: boolean;
  volume?: number;
  fadeIn?: number;
  /** Place the clip in the world; it pans and fades relative to `setListener`. */
  spatial?: SpatialOptions;
}

export type ChantPhase = 'idle' | 'intro' | 'asking' | 'open' | 'hunt';
export type ChantResult = 'ready' | 'timeout' | 'cancelled';

export interface ChantOptions {
  /** Max time spent in the ask/not_yet loop before the chant opens anyway. */
  timeoutMs?: number;
  onPhase?: (phase: ChantPhase) => void;
  /** Called as each line of the chant starts, with its length in seconds (for on-screen lyrics). */
  onLine?: (name: ClipName, seconds: number) => void;
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
  if (name === 'drum_loop') {
    // two bars of 4 hits at 120 bpm
    const dur = 2;
    const oc = new OfflineAudioContext(1, SR * dur, SR);
    [0, 0.5, 1, 1.5].forEach((t, i) => drumHit(oc, t, i % 2 ? 150 : 80, 0.3, 0.8));
    drumHit(oc, 0.75, 180, 0.15, 0.4);
    drumHit(oc, 1.75, 180, 0.15, 0.4);
    return oc.startRendering();
  }
  if (name === 'amb_market' || name === 'amb_generator') {
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
    lp.frequency.value = name === 'amb_market' ? 400 : 1400;
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

function setPannerPosition(p: PannerNode, x: number, y: number, z: number): void {
  if (p.positionX) {
    p.positionX.value = x;
    p.positionY.value = y;
    p.positionZ.value = z;
  } else {
    p.setPosition(x, y, z);
  }
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
  private impulse: AudioBuffer | null = null;

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

  /** Pause every sound (the game is paused). */
  async suspend(): Promise<void> {
    if (this.ctx && this.ctx.state === 'running') await this.ctx.suspend();
  }

  async resume(): Promise<void> {
    if (this.ctx && this.ctx.state === 'suspended') await this.ctx.resume();
  }

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

  /** Where the listener stands and faces (world metres). Call every frame while spatial voices play. */
  setListener(x: number, y: number, z: number, fx = 0, fy = 0, fz = -1): void {
    if (!this.ctx) return;
    const l = this.ctx.listener;
    const t = this.ctx.currentTime;
    if (l.positionX) {
      l.positionX.setTargetAtTime(x, t, 0.03);
      l.positionY.setTargetAtTime(y, t, 0.03);
      l.positionZ.setTargetAtTime(z, t, 0.03);
      l.forwardX.value = fx;
      l.forwardY.value = fy;
      l.forwardZ.value = fz;
      l.upX.value = 0;
      l.upY.value = 1;
      l.upZ.value = 0;
    } else {
      l.setPosition(x, y, z);
      l.setOrientation(fx, fy, fz, 0, 1, 0);
    }
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

  /** Raw bytes fetched ahead of the first gesture (a loading screen can show progress); decoding waits for unlock(). */
  private prefetched = new Map<string, ArrayBuffer>();

  /** Download clips without needing the audio context, so they are ready the moment the player taps Play. */
  async prefetch(names: readonly ClipName[], onEach?: () => void): Promise<void> {
    await Promise.all(
      names.map(async (name) => {
        try {
          const res = await fetch(`./audio/${name}.ogg`);
          if (res.ok) this.prefetched.set(name, await res.arrayBuffer());
        } catch {
          /* decoding will fall back to the placeholder */
        }
        onEach?.();
      }),
    );
  }

  private async fetchOrSynth(name: ClipName): Promise<AudioBuffer | null> {
    if (!this.ctx) return null;
    try {
      const pre = this.prefetched.get(name);
      let bytes: ArrayBuffer;
      if (pre) {
        bytes = pre.slice(0); // decodeAudioData detaches the buffer it is given
      } else {
        const res = await fetch(`./audio/${name}.ogg`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        bytes = await res.arrayBuffer();
      }
      // A dev server may answer a missing file with index.html; decode will reject it.
      return await this.ctx.decodeAudioData(bytes);
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
    const distant = opts.distant ?? DEFAULT_DISTANT.has(name);
    let fxNodes: AudioNode[] = [];
    let tailMs = 0;
    let panner: PannerNode | null = null;
    let out: AudioNode = this.channelGain[channel];
    if (opts.spatial) {
      const sp = opts.spatial;
      panner = ctx.createPanner();
      panner.panningModel = 'equalpower';
      panner.distanceModel = 'inverse';
      panner.refDistance = sp.refDistance ?? 2;
      panner.maxDistance = sp.maxDistance ?? 30;
      panner.rolloffFactor = sp.rolloff ?? 1.5;
      setPannerPosition(panner, sp.position.x, sp.position.y, sp.position.z);
      panner.connect(out);
      out = panner;
    }
    if (distant) {
      const o = distant === true ? {} : distant;
      this.impulse ??= makeImpulse(ctx, o.reverbSeconds ?? 0.6);
      const ir = o.reverbSeconds ? makeImpulse(ctx, o.reverbSeconds) : this.impulse;
      fxNodes = connectDistant(ctx, gain, out, ir, o);
      tailMs = ((o.reverbSeconds ?? 0.6) + 0.1) * 1000;
      src.connect(gain);
    } else {
      src.connect(gain).connect(out);
    }

    let resolveEnded!: () => void;
    const ended = new Promise<void>((r) => (resolveEnded = r));
    const entry = { name, voice: null as unknown as Voice };
    const voice: Voice = {
      name,
      duration: buffer.duration,
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
      setPosition: (x, y, z) => {
        if (panner) setPannerPosition(panner, x, y, z);
      },
    };
    entry.voice = voice;
    this.voices.add(entry);
    src.onended = () => {
      this.voices.delete(entry);
      src.disconnect();
      resolveEnded();
      // let the reverb tail ring out before tearing the chain down
      window.setTimeout(() => {
        gain.disconnect();
        panner?.disconnect();
        fxNodes.forEach((n) => n.disconnect());
      }, tailMs);
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
      opts.onLine?.(name, v.duration);
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
