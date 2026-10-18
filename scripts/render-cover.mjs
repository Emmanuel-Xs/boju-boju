// Renders public/cover.png (1600x1000, the game's own scene) through headless Chrome.
// Needs the dev server (npx vite --port 5173) and Chrome with --remote-debugging-port=9444 (see PROGRESS.md). Run: node scripts/render-cover.mjs
import { writeFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(root, 'public/cover.png');
const SHOT = {
  camera: { pos: [-10.4, 3.6, 6.6], look: [-9.6, 1.1, 0.2], fov: 50 },
  hider: { at: [-11.2, -0.95], surface: 'sign_wall' }, // top painted to match the wall, trousers still their own colour, pressed flat against it
  seeker: { at: [-8.5, 2.5], yaw: -2.55, suspicion: 0.32 },
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const targets = await (await fetch('http://127.0.0.1:9444/json')).json();
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id) pending.get(d.id)?.(d.result);
};
const call = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (e) => { const r = await call('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description?.slice(0, 300)); return r.result.value; };

await call('Runtime.enable');
await call('Emulation.setDeviceMetricsOverride', { width: 1600, height: 1000, deviceScaleFactor: 1, mobile: false });
const { camera: c, hider, seeker } = SHOT;
await call('Page.navigate', { url: `http://localhost:5173/?prep=1&hunt_s=600&camPos=${c.pos}&camLook=${c.look}&at=${hider.at}` });
for (let i = 0; i < 80; i++) {
  await wait(500);
  if ((await call('Runtime.evaluate', { expression: "typeof __boju === 'object' && document.querySelectorAll('button').length > 3", returnByValue: true }))?.result?.value) break;
}
const B = '__boju';
const play = await ev(`(() => { const b = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Play'); const r = b.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`);
await call('Input.dispatchMouseEvent', { type: 'mousePressed', x: play.x, y: play.y, button: 'left', clickCount: 1 });
await call('Input.dispatchMouseEvent', { type: 'mouseReleased', x: play.x, y: play.y, button: 'left', clickCount: 1 });
await ev(`${B}.requestReady()`);
await ev(`${B}.sim(12, () => ${B}.mode === 'hunt')`);
await ev(`(() => { const b = ${B}; b.pos.set(${hider.at[0]}, 0, ${hider.at[1]}); const col = b.level.surfaces.get('${hider.surface}').baseColor; b.player.setZoneColor('top', col); b.hiding.painted.top = true; b.hiding.setPose('wall_flat'); b.sim(1); return 0; })()`);
await ev(`(() => { const s = ${B}.seeker; s.blind = false; s.frustrated = false; s.placeAt(${seeker.at}, ${seeker.yaw}); s.lookAt = null; s.startLook('patrol_look'); s.lookBase = ${seeker.yaw}; s.lookDur = 999; s.cfg.lookSweepAngle = 0; s.cheatTimer = -999; s.suspicion = ${seeker.suspicion}; s.cfg.lostDecay = 0; ${B}.sim(0.8); return 0; })()`);
await ev(`(() => { const cam = ${B}.camera; cam.fov = ${c.fov}; cam.updateProjectionMatrix(); cam.position.set(${c.pos}); cam.lookAt(${c.look}); cam.updateMatrixWorld(true); return 0; })()`);
// hide every HUD overlay, then add the title card in the game's own font stack
await ev(`(() => {
  document.querySelectorAll('body > div').forEach((d) => (d.style.display = 'none'));
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;left:0;top:0;width:1100px;height:420px;padding:46px 0 0 64px;box-sizing:border-box;z-index:99;font-family:system-ui,sans-serif;color:#fff;background:radial-gradient(ellipse at 20% 30%,#2a140a99,#2a140a00 70%)';
  t.innerHTML = '<div style="font:800 168px/1 system-ui,sans-serif;letter-spacing:2px;text-shadow:0 8px 28px #000a,0 2px 0 #000">Boju Boju</div><div style="font:700 50px/1.2 system-ui,sans-serif;margin-top:8px;text-shadow:0 4px 16px #000c;color:#d8fd71">Hide from the masquerade</div>';
  document.body.appendChild(t);
  return 0;
})()`);
await wait(1800);
const shot = await call('Page.captureScreenshot', { format: 'png' });
const png = Buffer.from(shot.data, 'base64');
// the docs want under 2 MB: palette-quantise the PNG
await sharp(png).png({ palette: true, quality: 92, colours: 256, compressionLevel: 9, effort: 8, dither: 0.6 }).toFile(OUT);
console.log(`wrote ${path.relative(root, OUT)}: ${(statSync(OUT).size / 1024).toFixed(0)} KB (raw capture ${(png.length / 1024).toFixed(0)} KB)`);
process.exit(0);
