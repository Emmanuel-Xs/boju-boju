// Tiny debug panel for audio. Toggle with the backtick key.
import { audio, CHANNELS, CHANT_CLIPS, MUSIC_CLIPS, AMBIENCE_CLIPS, type ClipName } from './audio';

export function mountAudioDebug(): void {
  const panel = document.createElement('div');
  panel.style.cssText =
    'position:fixed;top:8px;right:8px;z-index:10;width:260px;padding:10px;background:#000c;color:#eee;' +
    'font:12px/1.4 monospace;border-radius:6px;display:none;max-height:calc(100% - 16px);overflow:auto';
  document.body.appendChild(panel);

  const row = (label?: string) => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;align-items:center;margin:4px 0';
    if (label) d.append(Object.assign(document.createElement('b'), { textContent: label, style: 'width:100%' }));
    panel.appendChild(d);
    return d;
  };
  const button = (parent: HTMLElement, text: string, fn: () => void) => {
    const b = document.createElement('button');
    b.textContent = text;
    b.style.cssText = 'font:inherit;padding:2px 6px;cursor:pointer';
    b.onclick = () => {
      void audio.unlock().then(fn);
    };
    parent.appendChild(b);
    return b;
  };
  const slider = (parent: HTMLElement, label: string, value: number, fn: (v: number) => void) => {
    const l = document.createElement('label');
    l.style.cssText = 'display:flex;gap:6px;width:100%;align-items:center';
    const input = document.createElement('input');
    input.type = 'range';
    input.min = '0';
    input.max = '1';
    input.step = '0.01';
    input.value = String(value);
    input.style.flex = '1';
    input.oninput = () => fn(Number(input.value));
    l.append(Object.assign(document.createElement('span'), { textContent: label, style: 'width:64px' }), input);
    parent.appendChild(l);
  };

  const head = row('Audio debug (` to hide)');
  const status = document.createElement('span');
  const refresh = () => (status.textContent = audio.unlocked ? 'unlocked' : 'locked (nothing plays)');
  refresh();
  head.append(status);
  button(head, 'Unlock (stand-in for Play)', refresh);
  const mute = button(head, '', () => {
    audio.setMuted(!audio.isMuted());
    mute.textContent = audio.isMuted() ? 'Unmute' : 'Mute';
  });
  mute.textContent = audio.isMuted() ? 'Unmute' : 'Mute';
  // Mute is allowed while locked, so it must not require unlock.
  mute.onclick = () => {
    audio.setMuted(!audio.isMuted());
    mute.textContent = audio.isMuted() ? 'Unmute' : 'Mute';
  };

  const clips = row('Clips (once)');
  for (const n of [...CHANT_CLIPS, ...MUSIC_CLIPS, ...AMBIENCE_CLIPS] as ClipName[]) {
    button(clips, n, () => void audio.playOnce(n));
  }

  const loops = row('Loops');
  for (const n of [...MUSIC_CLIPS, ...AMBIENCE_CLIPS] as ClipName[]) {
    const on = { v: false };
    const b = button(loops, `${n}: off`, () => {
      on.v = !on.v;
      b.textContent = `${n}: ${on.v ? 'on' : 'off'}`;
      if (on.v) void audio.loop(n, { fadeIn: 0.5 });
      else audio.stop(n, 0.5);
    });
  }
  button(loops, 'crossfade A→B', () => void audio.crossfade('ambience_a', 'ambience_b', 2));
  button(loops, 'crossfade B→A', () => void audio.crossfade('ambience_b', 'ambience_a', 2));
  button(loops, 'stop all', () => audio.stopAll(0.2));

  const chant = row('Chant sequence');
  const phase = document.createElement('span');
  phase.textContent = 'idle';
  button(chant, 'start (8s timeout)', () => {
    phase.textContent = 'starting';
    void audio
      .startChant({ timeoutMs: 8000, onPhase: (p) => (phase.textContent = p) })
      .then((r) => console.log('[audio] chant finished:', r));
  });
  button(chant, 'ready()', () => audio.chantReady());
  button(chant, 'cancel', () => {
    audio.cancelChant();
    phase.textContent = 'idle';
  });
  chant.append(phase);

  const heart = row('Heartbeat suspicion');
  slider(heart, 'suspicion', 0, (v) => audio.setSuspicion(v));

  const vols = row('Channel volume');
  for (const ch of CHANNELS) slider(vols, ch, audio.getVolume(ch), (v) => audio.setVolume(ch, v));

  addEventListener('keydown', (e) => {
    if (e.code !== 'Backquote') return;
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    refresh();
  });
}
