// WebAudio manager. Nothing is created or played until unlock() runs from a user gesture.
// Clips load from ./audio/<name>.ogg; a missing or undecodable clip falls back to a synthesized placeholder.

export type Channel = 'chant' | 'music' | 'ambience' | 'sfx';
export const CHANNELS: Channel[] = ['chant', 'music', 'ambience', 'sfx'];

export const CHANT_CLIPS = ['chant_intro', 'chant_ask', 'chant_not_yet', 'chant_open', 'chant_hunt', 'caught'] as const;
export const MUSIC_CLIPS = ['drum_loop'] as const;
export const AMBIENCE_CLIPS = ['amb_market', 'amb_generator', 'amb_rain'] as const;
export const HORN_CLIPS = ['sfx_horn_motorbike_01', 'sfx_horn_motorbike_02'] as const;
export const STEP_NAMES = (['concrete', 'sand'] as const).flatMap((s) => [1, 2, 3, 4, 5].map((i) => `sfx_step_${s}_0${i}` as const));
export const UI_CLIPS = ['sfx_ui_click_01', 'sfx_ui_click_02', 'sfx_ui_confirm_01', 'sfx_ui_back_01'] as const;
/** Real recordings (Freesound, CC0; the raffia and ankle bells are our own, made by scripts/make-sounds.mjs): a hen's alarm call and a cluck, the masquerade's shekere rattle and cloth swish, a pose rustle, a gasp when it spots something. */
export const HEN_CLIPS = ['sfx_hen_squawk_01', 'sfx_hen_squawk_02'] as const;
export const WORLD_CLIPS = ['sfx_hen_cluck_01', 'sfx_egungun_rattle_01', 'sfx_egungun_rattle_02', 'sfx_cloth_swish_01', 'sfx_cloth_rustle_01', 'sfx_spotted_01', 'sfx_raffia_01', 'sfx_raffia_02', 'sfx_bells_01', 'sfx_bells_02', 'sfx_power_cut', 'sfx_thunder_01'] as const;
export const DRUM_CLIPS = ['drum_hit_01', 'drum_hit_02', 'drum_hit_03'] as const;
export const LAND_CLIPS = ['sfx_hit_soft_01', 'sfx_hit_soft_02'] as const;
export const SFX_CLIPS = [...HORN_CLIPS, ...HEN_CLIPS, ...WORLD_CLIPS, ...LAND_CLIPS, ...DRUM_CLIPS, 'sfx_rooster_01', 'sfx_paint', 'jingle_win', 'jingle_caught', ...STEP_NAMES, ...UI_CLIPS] as const;
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
  amb_rain: 'ambience',
  sfx_horn_motorbike_01: 'sfx',
  sfx_horn_motorbike_02: 'sfx',
  sfx_rooster_01: 'sfx',
  sfx_paint: 'sfx',
  jingle_win: 'sfx',
  jingle_caught: 'sfx',
  ...(Object.fromEntries([...STEP_NAMES, ...UI_CLIPS, ...LAND_CLIPS, ...DRUM_CLIPS, ...HEN_CLIPS, ...WORLD_CLIPS].map((n) => [n, 'sfx'])) as Record<(typeof STEP_NAMES)[number] | (typeof UI_CLIPS)[number] | (typeof LAND_CLIPS)[number] | (typeof DRUM_CLIPS)[number] | (typeof HEN_CLIPS)[number] | (typeof WORLD_CLIPS)[number], Channel>),
};

/** Clips that always sound far away unless the caller says `distant: false`. */
const DEFAULT_DISTANT = new Set<ClipName>(HORN_CLIPS);

const MUTE_KEY = 'boju.muted';

/**
 * The mix. Clip loudness was measured (EBU R128, see PROGRESS.md): chant lines sit near -16 LUFS and everything else is set under them,
 * ambience lowest. While a chant line plays, the other channels duck so the Yoruba stays clear.
 */
export const MIX_CONFIG = {
  /** Starting level of each channel (the player can still change it with setVolume). */
  channels: { chant: 1.15, music: 0.3, ambience: 0.35, sfx: 0.65 } as Record<Channel, number>,
  /** While any chant line plays, these channels drop to this fraction of their level. */
  duck: { ambience: 0.15, music: 0.15, sfx: 0.4 } as Partial<Record<Channel, number>>,
  duckAttackSeconds: 0.12,
  duckReleaseSeconds: 0.9,
  /** The gap between two chant lines is shorter than this, so the ambience does not swell back in it. */
  duckHoldSeconds: 0.45,
  /** Safety limiter on the master output, for the loudest stingers. */
  limiter: { threshold: -3, knee: 0, ratio: 20, attack: 0.003, release: 0.12 },
  heart: {
    /** Output level of the heartbeat (its own bus, so chant ducking does not touch it). */
    level: 0.5,
    /** Share of the full level when suspicion first appears. */
    minShare: 0.3,
    /** Low body of the beat, and the upper knock that lets phone and laptop speakers play it. */
    bodyHz: 56,
    knockHz: 130,
    knockShare: 0.6,
  },
};

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
  /** Playback speed (also changes pitch). Default 1. */
  rate?: number;
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
  private duckGain = {} as Record<Channel, GainNode>;
  private heartBus!: GainNode;
  private chantVoices = 0;
  private duckHold: number | null = null;
  private volumes: Record<Channel, number> = { ...MIX_CONFIG.channels };
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
      const lim = this.ctx.createDynamicsCompressor();
      const L = MIX_CONFIG.limiter;
      lim.threshold.value = L.threshold;
      lim.knee.value = L.knee;
      lim.ratio.value = L.ratio;
      lim.attack.value = L.attack;
      lim.release.value = L.release;
      this.master.connect(lim).connect(this.ctx.destination);
      for (const ch of CHANNELS) {
        const g = this.ctx.createGain();
        g.gain.value = this.volumes[ch];
        const d = this.ctx.createGain();
        g.connect(d).connect(this.master);
        this.channelGain[ch] = g;
        this.duckGain[ch] = d;
      }
      this.heartBus = this.ctx.createGain();
      this.heartBus.gain.value = MIX_CONFIG.heart.level;
      this.heartBus.connect(this.master);
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
    if (opts.rate) src.playbackRate.value = opts.rate;
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
    if (channel === 'chant') this.chantStarted();
    src.onended = () => {
      this.voices.delete(entry);
      if (channel === 'chant') this.chantEnded();
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
    this.cancelDrumRoll();
    this.setSuspicion(0);
    for (const v of [...this.voices]) v.voice.stop(fade);
  }

  /** Fade ambience `a` out and `b` in over `seconds`. */
  async crossfade(a: ClipName, b: ClipName, seconds = 2): Promise<Voice | null> {
    this.stop(a, seconds);
    return this.loop(b, { fadeIn: seconds });
  }

  // --- ducking: the chant is the loudest thing in the game, so the rest steps back while it plays

  private duckTo(down: boolean): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const seconds = down ? MIX_CONFIG.duckAttackSeconds : MIX_CONFIG.duckReleaseSeconds;
    for (const ch of CHANNELS) {
      const g = this.duckGain[ch].gain;
      g.cancelScheduledValues(t);
      g.setTargetAtTime(down ? (MIX_CONFIG.duck[ch] ?? 1) : 1, t, seconds / 3);
    }
  }

  private chantStarted(): void {
    this.chantVoices++;
    if (this.duckHold !== null) window.clearTimeout(this.duckHold);
    this.duckHold = null;
    this.duckTo(true);
  }

  private chantEnded(): void {
    this.chantVoices = Math.max(0, this.chantVoices - 1);
    if (this.chantVoices > 0) return;
    this.duckHold = window.setTimeout(() => {
      this.duckHold = null;
      if (this.chantVoices === 0) this.duckTo(false);
    }, MIX_CONFIG.duckHoldSeconds * 1000);
  }

  /** Where the mix stands right now (for tests): each channel's duck multiplier. */
  mixSnapshot(): Record<Channel, number> {
    return Object.fromEntries(CHANNELS.map((ch) => [ch, this.duckGain[ch] ? +this.duckGain[ch].gain.value.toFixed(3) : 1])) as Record<Channel, number>;
  }

  // --- a hen's alarm call, placed where the hen is

  squawk(x: number, z: number, volume = 0.6): void {
    const clip = HEN_CLIPS[Math.floor(Math.random() * HEN_CLIPS.length)];
    void this.playOnce(clip, { volume, rate: 0.92 + Math.random() * 0.2, spatial: { position: { x, y: 0.3, z }, refDistance: 2.5, maxDistance: 30, rolloff: 1.2 } });
  }

  // --- drum roll: the warning before the masquerade's spin sweep

  private rollTimers: number[] = [];

  /** Hits that speed up and swell over `seconds`, ending on one big hit. */
  drumRoll(seconds: number): void {
    this.cancelDrumRoll();
    const hits = 12;
    // hit i lands at seconds * (i / hits) ^ 0.7, so they bunch up towards the end
    for (let i = 0; i < hits; i++) {
      const at = seconds * (i / hits) ** 0.7 * 0.92;
      const volume = 0.22 + 0.5 * (i / hits);
      const clip = DRUM_CLIPS[1 + (i % 2)];
      this.rollTimers.push(window.setTimeout(() => void this.playOnce(clip, { volume, rate: 1.1 + 0.2 * (i / hits) }), at * 1000));
    }
    this.rollTimers.push(window.setTimeout(() => void this.playOnce('drum_hit_01', { volume: 0.95 }), seconds * 1000));
  }

  cancelDrumRoll(): void {
    for (const t of this.rollTimers) window.clearTimeout(t);
    this.rollTimers = [];
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
    const H = MIX_CONFIG.heart;
    const vol = H.minShare + (1 - H.minShare) * s;
    const t = ctx.currentTime;
    this.thump(t, H.bodyHz, H.knockHz, vol);
    this.thump(t + 0.17 - 0.05 * s, H.bodyHz * 0.82, H.knockHz * 0.85, vol * 0.7);
    const period = 1.1 - 0.75 * s; // ~55 bpm calm, ~170 bpm panicked
    this.heartTimer = window.setTimeout(() => this.beat(), period * 1000);
  }

  /** One beat: a low body plus a short higher knock, so it is heard on small speakers and not only felt on big ones. */
  private thump(t: number, body: number, knock: number, gain: number): void {
    const ctx = this.ctx!;
    const H = MIX_CONFIG.heart;
    const voice = (hz: number, level: number, decay: number) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(hz * 1.6, t);
      osc.frequency.exponentialRampToValueAtTime(hz, t + 0.06);
      g.gain.setValueAtTime(level, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + decay);
      osc.connect(g).connect(this.heartBus);
      osc.start(t);
      osc.stop(t + decay + 0.02);
      osc.onended = () => g.disconnect();
    };
    voice(body, gain, 0.16);
    voice(knock, gain * H.knockShare, 0.07);
  }
}

export const audio = new AudioManager();
