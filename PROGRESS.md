# Boju Boju: progress log

Resume notes for whoever (or whichever session) picks this up. Newest entry last. Dev server: `npx vite --port 5173 --strictPort --host 127.0.0.1`. Release: `npm run release`.

## Before the phases (summary of what existed)
Compound level (`src/levels/compound.ts`), procedural player and egungun masquerade, hiding and painting (`src/levels/hiding.ts`, `src/camo.ts`), seeker AI (`src/seeker.ts`), chickens, container shop, round flow with chant lyrics. All tuning numbers are in config objects at the top of their files.

## Phase 0: safety and housekeeping (done)
- Searched the working tree and all 11 commits (`git rev-list --all`) for FREESOUND_API_KEY values, api_key / secret / bearer / password patterns, and 32+ and 40+ character hex/base64 strings outside `public/models`: nothing. The only hit is `scripts/fetch-freesound.mjs`, which reads `process.env.FREESOUND_API_KEY` and stores nothing.
- `raw-assets/` is gitignored (`.gitignore:2`) and no path under it appears in any commit; nothing under `references/` ever committed; no `.env`/`.pem`/credentials files in history.
- Pushed the 5 unpushed commits (`cf2a73d..fea6c05`). `POST /games/check`: `ok: true`, 114 files, 3.1 MB, warnings `no_cover` and `no_start_ng_player` only (both are Phase 2/3 work).
- Open: none.

## Phase 1: the full round loop (done)
**What changed**
- New entry flow (`src/game.ts` replaces `levels/viewer.ts`; `src/main.ts` now always starts the game; `?debug` is dev-only): lobby, then a run of rounds. Modes: lobby, prep, hunt, cleared, dying (1 s slow motion), results. Esc or a hidden tab pauses (and suspends audio); Esc first stops the eyedropper if it is on.
- Lobby: the player's full look (hair, hat, accessory) on a turntable in the compound at golden hour, name, @account, face picture, best run, Play (unlocks audio), How to play card (keyboard and touch text), top-10 board panel (filled by Phase 2).
- Run config in `src/run.ts` (`RUN_CONFIG`): prep 25 s, hunt 90 s, difficulty ramps for the seeker (cone 52 to 90 degrees, range 9 to 13 m, suspicion rate x0.65 to x1.5, peek interval 24 s down to 9 s, more peek candidates, patrol speeds up to 4.0 m/s, below a runner's 4.8). Each round applies the ramp to a private copy of the seeker config; the vision cone is redrawn.
- Prep: seeker at the gate, eyes covered (`sing_eyes_covered`), no cone. Chant sequencer plays intro then loops ask / not-yet; lyrics show Yoruba with an English gloss underneath. Ready button / Enter calls `chantReady()`; points bonus = seconds left x 2. Timer end does the same without the bonus. The hunt starts when the sequencer reaches `chant_hunt`; a watchdog starts it after 8 s anyway.
- Hunt: `setHuntMode(true)`, profile card top left (face, name, @account), AI starts, round HUD with timer, round number, camo meter; suspicion drives indicator, cone colour and the heartbeat.
- Cleared: confetti, jingle, hops, frustrated seeker (`look_around`), then a fresh prep with clothes reset to the start.ng colours and paint/recents cleared. Caught: lunge, `caught.ogg`, fabric burst, 1 s slow motion, look restored, results.
- Results: rounds, time hidden, best camo, points, a verdict line (10 playful, respectful lines in `RUN_CONFIG`'s sibling `VERDICTS`), board, Play again, Back to lobby.
- Phone layout: HUD re-flows under 600 px (profile card top left, round bar top right, meter under the card, thumb buttons on the right, poses bottom left); palette swatches are 46 px on touch.
**Tests (headless Chrome)**
- Three complete runs back to back on the dev server with real clicks and key events (Play, Enter, Esc, Play again, Back to lobby): run 1 caught in round 1; run 2 cleared 2 rounds then caught in round 3 (cone 60 degrees there, clothes reset to `#f4a300` each round, hunt mode off between rounds); run 3 paused mid-hunt (timer frozen for 3 s of simulated time, resumed) then caught. No console errors or warnings. Memory: scene nodes 178 and DOM nodes about 332 constant across runs, JS heap about 61 to 62 MB after run 1, geometries 55 to 58, textures 18 to 21 (grew only on the first two runs, flat after).
- Touch check at 390x844: no overlapping or off-screen controls in lobby, prep, hunt, palette open; all buttons at least 44 px. Desktop 1440x900 screenshots of all six screens reviewed.
- Production build: loads, lobby then Play then round bar work, `window.__boju` absent, no `debugScene` in the bundle.
**Not verified:** real fps; any audio by ear (chant timing against the lyrics is by sample length only); touch feel; the lyric English glosses are ours and need a Yoruba speaker to check.
**Open**
- Identity, leaderboard and score saving are still the local fallback (`src/startng.ts`): Phase 2.
- `cover.png`, loading bar, auto quality, dev-gating of the remaining debug overlays (markers, stats, AI text are already DEV-only): Phase 3.

## Phase 2: start.ng integration (done)
**What changed**
- `src/startng.ts`: the docs' `connectFrame` / `askStartNg` helper (origin and source checked on every reply). `startng:whoami` on load, on `focus` and on `visibilitychange`; `startng:leaderboard` (asks for 50 rows, lobby and results show the top 10); `startng:score` at the end of each run.
- Signed in: character from `user.style`, `user.name`, `@user.account`, `user.face` (a PNG data URL, validated before use; otherwise a face is drawn). Guest: the `guest` look and name. No reply: local guest, never blocks (whoami cap 2.5 s, and the board loads in the background); it asks again at 3 s and 8 s and on focus.
- `?guest` in the URL hides the lobby sign-in button; otherwise guests get "Sign in to save your score" (`https://start.ng/?return_to=...`). The results screen always invites guests to sign in and shows the board.
- `public/startng.json` (ships in `dist/`): `rounds` "Rounds survived" (highest), `hidden` "Time hidden" (highest, `time` format, whole seconds), `camo` "Best camo %" (highest). Score messages send exactly those three whole numbers, 0 to 1e9. Results show improved and rank; the player's row is highlighted by `player_id` in lobby and results. A signed-in player's best run is read from their own board row.
- `scripts/mock-startng.mjs`: a stand-in connect page for local testing (`node scripts/mock-startng.mjs`, then `?startng=http://localhost:5174` on the dev server; that override is compiled out of production).
- Names, accounts and faces only enter the DOM through `textContent` / validated `img.src`.
**Tests (headless Chrome, against the mock)**
- Signed in: lobby shows Runner Tee, @Hamzat, the mock's face, best run read from the board row (5 rounds, 6:41, 94%), top-10 board with the own row highlighted; character from the style (`#a55eea`, braids, crown, earrings); after a run the mock received exactly `{"rounds":0,"hidden":4,"camo":0}` and the results said "Not your best this time. You are #2 with 5 rounds."
- Guest: guest look, sign-in button present, absent with `?guest`; results invite sign-in.
- Silent start.ng: lobby appears with a local guest, no blocking (5.2 s versus 7.3 s page load in software rendering), run and results work.
- Focus and visibilitychange: signing in on "another tab" switched the character from the guest look to the signed-in one and back, with no reload.
- No console errors or warnings in any of these.
**Not verified:** the real start.ng connect page and real leaderboard (the game can only talk to them once it is live on `*.start.ng`); the real `user.face` image; the `no_start_ng_player` warning clearing (checked against the pushed repo below).
**Open:** cover, loading bar, auto quality, final gating (Phase 3).

## Phase 3: publish readiness (done; stopped before publish)
**What changed**
- `public/cover.png`, 1600x1000, 498 KB, rendered from the game itself by `scripts/render-cover.mjs` (dev server plus headless Chrome on port 9444): the compound at golden hour, the masquerade with its cone and "!" indicator, a hider with only their top painted to match the sign wall, pressed flat against it, and the title card "Boju Boju / Hide from the masquerade" in the game's own font stack (`system-ui`; the game ships no web font). Lands next to `index.html` in `dist/`.
- Gating: `?debug`, the backtick audio panel, markers, AI text, `&stats`, the test handle `window.__boju`, the start.ng mock override and the timing overrides are all behind `import.meta.env.DEV` (verified absent from the production bundle: no `debugScene`, no `Unlock (stand-in for Play)`, `__boju` undefined). `public/debug/` is removed from `dist/` by `scripts/strip-debug.mjs`. `?perf=1` is the only production overlay (fps, draw calls, quality tier).
- Auto quality (`src/quality.ts`, `QUALITY_CONFIG`): measures fps over 5 s windows during a hunt; under 45 it steps down one tier and measures again: low shadows (512 px map), then pixel ratio 1, then dust off. Logs `[quality] ...` to the console. Measured fresh each session (not remembered). Tested under software rendering: tiers 1, 2, 3 reached in successive windows (2.1 to 2.8 fps measured), then settled and logged.
- Loading screen with a progress bar for the compound's textures and models and the 12 sounds (sounds are fetched ahead and decoded after Play).
- Page title, SVG mask favicon (`public/favicon.svg`), meta description, theme colour `#2fa59b`, Open Graph title and description.
- Touch checked at 390x844 (see Phase 1): no overlaps, all controls at least 44 px.
**Measured**
- Whole game in `dist/`: 116 files, 3.43 MB uncompressed (limits: 100 MB, 25 MB per file, 2000 files). First load to the lobby: 1.21 MB transferred in 51 requests (vite preview compresses; start.ng's server may not), so even uncompressed it cannot pass 3.4 MB, under the 5 MB budget. Biggest files: `amb_generator.ogg` 281 KB, game chunk 144 KB, three.js chunk about 640 KB uncompressed.
**Not verified:** real device fps and the auto-quality thresholds on a real phone; audio by ear; touch feel; how start.ng's server compresses.
**Open:** nothing blocks publishing. Waiting for the go to call `/games/publish`.

## Fix: leaderboard only saved when caught (dev branch)
- Cause: the score was sent only when a run ended in a catch. Clearing rounds and leaving, or just stopping, saved nothing.
- Fix: the run so far is saved after every cleared round (the board keeps each player's best, so this is safe). Saves queue in order. The results screen no longer says "Not your best" when this run already set the best.
- Test: mock start.ng received `{"rounds":1,"hidden":5,"camo":0}` right after clearing round 1 with no catch. Three full runs in headless Chrome, no console errors. Production bundle loads and starts a round clean.
- Workflow from now on: all work on `dev`; merge into `main` only after release + check-assets + /games/check (branch=dev) + three runs pass.

## Phase 4: sound pass (dev branch)
**Done**
- Mix (`MIX_CONFIG` in `src/audio.ts`): chant at full level, everything else measured and set under it. Estimated levels (clip LUFS + gain stack): chant lines about -16 LUFS; ambience about -32 (about -41 while a chant line plays); stingers about -20; rooster about -27.
- Ducking: while any chant line plays, ambience and music fall to 35% and sfx to 60% (attack 0.12 s, release 0.9 s, 0.45 s hold between lines so ambience does not pump between lines). Verified in headless Chrome: duck values drop within 0.5 s of the first line, hold through the ask/not-yet loop, and return to 1 about 0.5 s after the last line.
- Master limiter added (the win jingle peaks at +1.9 dBFS in its file).
- Heartbeat: own bus (not ducked), a low body plus a 130 Hz knock so phone and laptop speakers can play it (the old 46-58 Hz sine could not be heard on small speakers); starts at 30% level, climbs with suspicion.
- Footsteps for the player (concrete on the yard, sand on the dirt patch and outside) and for the masquerade (placed in the world, pitched down 22%), from the Kenney CC0 clips already in the repo. Landing thud, menu clicks (Play/again = confirm, Quit/Resume/lobby = back), and occasional distant motorbike horns. These clips were in the repo but never played before.
- No new files downloaded, so CREDITS.md is unchanged.

**Blocked: FREESOUND_API_KEY is not set in this shell**, so nothing was fetched from Freesound. Export it for the session (`export FREESOUND_API_KEY=...`) and say so; `scripts/fetch-freesound.mjs` reads it from the environment only and uses preview-hq-ogg.

**Not verified:** all of it by ear (levels are computed from measured clip loudness, not listened to), real-device speaker behaviour of the heartbeat, mobile audio unlock.

**Placeholder chant lines to re-record, in order (YarnGPT2 stand-ins)**
1. `chant_ask` "Ṣé kí n ṣí i?" 1.3 s, the Egungun. Heard about 10 times a round.
2. `chant_not_yet` "Má ṣí i!" 0.7 s, the children. Heard about 10 times a round, so a weak read shows fastest.
3. `chant_intro` "Bojú bojú o! Ẹ̀gúngún ń bọ̀! Ẹ sá pamọ́!" 3.7 s. Longest line, most tone marks, opens every round.
4. `caught` "Mo rí ẹ!" 0.9 s. Heard on every run ending.
5. `chant_open` "Ṣí i!" 0.5 s.
6. `chant_hunt` "Ẹni tí mo bá rí, màá jẹ ẹ́!" 2.4 s.
Record each as a dry mono WAV, no music or reverb. The English glosses under the lyrics are mine; a Yoruba speaker should check them too.

**Sounds the game still lacks (needs the key to search, or a recording)**
- Masquerade movement: raffia/cloth swish and ankle bells or rattle, looped while it walks (Freesound CC0: "raffia", "ankle bells", "shaker").
- Chicken clucks and a startled squawk when the player runs past.
- A short "spotted" sting for when the cone first catches you (a recorded "Ehn!" would fit).
- Cloth rustle for striking a pose.
