// A stand-in for https://start.ng/connect for local testing. Run it, then open the game on the dev server with ?startng=http://localhost:5174
//   node scripts/mock-startng.mjs [port]
// Control it with:  curl -X POST localhost:5174/__state -d '{"whoami":"signed|guest|silent","user":{...}}'   and read what the game saved at GET /__state
import { createServer } from 'node:http';

const port = Number(process.argv[2] ?? 5174);
const face = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
const state = {
  whoami: 'signed',
  user: { id: 42, name: 'Runner Tee', account: 'Hamzat', style: { body: 'female', primaryColor: '#a55eea', secondaryColor: '#0c6e5a', skinColor: '#8d5524', hairColor: '#17120f', hair: 'braids', hat: 'crown', accessory: 'earrings' }, face },
  guest: { name: 'Guest', style: { body: 'male', primaryColor: '#3b82f6', secondaryColor: '#374151', skinColor: '#c68642', hairColor: '#2b1b12', hair: 'short', hat: 'none', accessory: 'none' }, face },
  board: [
    { rank: 1, player_id: 7, name: 'Trini', color: '#4b7bec', score: 2210, stats: { score: 2210, rounds: 8, camo: 97 } },
    { rank: 2, player_id: 42, name: 'Runner Tee', color: '#a55eea', score: 1405, stats: { score: 1405, rounds: 5, camo: 94 } },
    { rank: 3, player_id: 9, name: 'Ada', color: '#26de81', score: 640, stats: { score: 640, rounds: 3, camo: 81 } },
  ],
  saved: [],
  scoreError: null,
};

const page = `<!doctype html><meta charset=utf-8><title>mock connect</title><script>
addEventListener('message', async (e) => {
  const d = e.data || {};
  const st = await fetch('/__state').then(r => r.json());
  if (st.whoami === 'silent') return;
  const reply = (m) => e.source.postMessage({ ...m, requestId: d.requestId }, e.origin);
  if (d.type === 'startng:whoami') reply({ type: 'startng:user', user: st.whoami === 'signed' ? st.user : null, guest: st.guest });
  else if (d.type === 'startng:leaderboard') reply({ type: 'startng:leaderboardData', ok: true, entries: st.board.slice(0, d.limit || 10) });
  else if (d.type === 'startng:score') {
    if (st.whoami !== 'signed') return reply({ type: 'startng:scoreSaved', ok: false, error: 'Sign in to save your score' });
    const r = await fetch('/__score', { method: 'POST', body: JSON.stringify(d.stats) }).then(r => r.json());
    reply({ type: 'startng:scoreSaved', ...r });
  }
});
</script>`;

const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  const body = [];
  req.on('data', (c) => body.push(c));
  req.on('end', () => {
    const raw = Buffer.concat(body).toString();
    const json = (o) => (res.setHeader('Content-Type', 'application/json'), res.end(JSON.stringify(o)));
    if (url.pathname === '/connect') return res.setHeader('Content-Type', 'text/html'), res.end(page);
    if (url.pathname === '/__state' && req.method === 'POST') return Object.assign(state, JSON.parse(raw)), json(state);
    if (url.pathname === '/__state') return json(state);
    if (url.pathname === '/__score') {
      const s = JSON.parse(raw);
      for (const k of ['score', 'rounds', 'camo']) if (!Number.isInteger(s[k]) || s[k] < 0) return json({ ok: false, error: `bad stat ${k}` });
      if (Object.keys(s).length !== 3) return json({ ok: false, error: 'wrong stats' });
      state.saved.push(s);
      const mine = state.board.find((e) => e.player_id === state.user.id);
      const improved = !mine || s.score > mine.stats.score || (s.score === mine.stats.score && s.rounds > mine.stats.rounds);
      if (improved) {
        if (mine) Object.assign(mine, { score: s.score, stats: s });
        else state.board.push({ rank: 0, player_id: state.user.id, name: state.user.name, color: '#a55eea', score: s.score, stats: s });
        state.board.sort((a, b) => b.stats.score - a.stats.score || b.stats.rounds - a.stats.rounds);
        state.board.forEach((e, i) => (e.rank = i + 1));
      }
      const best = state.board.find((e) => e.player_id === state.user.id);
      return json({ ok: true, result: { best: best.stats.score, improved, rank: best.rank, stats: best.stats } });
    }
    res.statusCode = 404;
    res.end('not found');
  });
});
server.listen(port, '127.0.0.1', () => console.log(`mock start.ng connect page on http://localhost:${port}/connect`));
