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

## Seeker fix + gameplay part 2 (dev branch)
**Playtest problem:** the egungun could not reach corners, so corners were always safe.

**What was really wrong (found by measuring, not guessing)**
- The patrol only walked to the stand point 2 m in front of each hiding spot. Three spots in the south-east alley had stand points in pockets the 0.65 m body cannot path into, so the patrol picked them, failed, and fell back to the same few stops. Corners that were not hiding spots were never aimed at at all.
- Catching needed the masquerade to run up to the player; a hider in a tight corner was out of reach.

**Part 1 (done)**
- Catch by sight: suspicion 1.0 + player visible within `catchRange` (6 m) = lunge toward them (0.5 s, no touching). Further away it closes in at `chaseSpeed` first. Config in `SEEKER_CONFIG`.
- Nav: 0.5 m grid baked from the colliders (`src/nav.ts`), A*, string-pulled, corners rounded (`pathRound`). Body is a 0.6 m radius capsule; cloth panels are only drawn and never collide. The grid knows which cells are in the main walkable area (`mainArea`), so pockets are not used as stand points.
- Patrol (`src/patrol.ts`): replaces the shuffled spot list. Every floor cell has an age; it walks to the stop that refreshes the most stale floor per second (age squared, so a forgotten corner beats a big area that went slightly stale). Stops = every hiding spot + a viewing stop for every floor corner + extra stops until every cell is seen. Anything unseen for 80 s forces a visit. Stuck on a stop = snoozed for 45 s. Ages persist across rounds of a run and reset on a new run. Also: a glimpse above `curiousAt` (0.2) sends it to take a closer look.
- Level: the yard is now the whole play area (the road outside the gate is out of bounds, it was a free hiding place); the danfo moved 0.55 m west so the lane beside it is wide enough for the masquerade; the stack of chairs moved from the lane to the south wall (it plugged the way into the slot by the steps).
- Dead-zone analysis (`src/levels/coverage.ts`, overlay `?zones` in dev, `src/levels/zonesOverlay.ts`): walks a line of sight from every cell the masquerade can stand on to every cell a player can stand on. **Result: no dead zones, nothing seen from three cells or fewer.** All 28 hiding spots are seeable at catch range. Two deliberate golden spots are tagged in `GOLDEN_SPOTS`: the slot between the danfo and the hollow-block steps (`block_steps`), and the pocket behind the water tank (`water_tank`, `zinc_fence`). They are still checked, they are just hard to catch someone in.

**Part 2 (done)**
1. Spin sweep: every 18 to 25 s (random) it twirls. 1 s warning (drum roll, panels lift, arms rise, orange ring on the floor, "SPIN SWEEP!" popup), then 1.5 s of 360 degree vision inside 5 m. `spin*` in `SEEKER_CONFIG`.
2. Footprints (`src/levels/footprints.ts`, `src/levels/ground.ts`): running on bare dirt leaves prints, walking leaves none; one instanced mesh, 60 max, fade over 10 s. The masquerade notices fresh prints in its cone with a clear line to them and follows the trail print to print, then looks around. `print*`/`trail*` in `SEEKER_CONFIG`.
3. Run home (`src/levels/gate.ts`): once the masquerade is more than 12 m from the gate, the gate glows green with a "RUN HOME" sign; touching it ends the round with a bonus (250 + 2 per second left). First time it is possible, a hint popup shows (remembered in localStorage).

**Scoring**
- Score = survival (2/s in the hunt) + near misses (8/s inside the cone, visible, within 8 m, not caught) + Ready early (2 per second of prep left) + run home bonus + camo bonus (round's average camo x 2, on clearing). Popups float up as they happen (per-second ones are grouped). The results screen shows the breakdown. All numbers in `RUN_CONFIG.score` / `RUN_CONFIG.runHome`.
- `public/startng.json`: `score` (Score, highest), `rounds` (Rounds survived), `camo` (Best camo %). The game sends exactly those three whole numbers; the mock now checks that. The previous columns (rounds, hidden, camo) are gone from the board.

**Tests** (headless Chrome, SwiftShader; the harness stubs the cloth and uses the 2D sight test so 180 s of game runs in ~5 s)
- Bot hiders camped in every corner (62, one of them in the gate mouth) and at every hiding spot (28), camo pinned at 100 so nothing is caught, 2 hunts (180 s) each: **62/62 corners and 28/28 spots checked** (seen in the cone with clear sight within 6 m). Final run: **61/62 corners and 28/28 spots**; the one corner not checked is inside the gate mouth (x 14.6, z -1.8), where a hider standing triggers Run home instead, by design. Median first check 24 s, 90th percentile 49 s. An earlier run left the far end of the south-east alley unchecked: the patrol was crediting a spot look with cells the narrow round-1 cone does not actually reach, so the arc was narrowed (`spotArc` 1.2) and the forced-revisit age cut to 80 s.
- Catch rate within 2 hunts, 2 trials per spot: camo 20 = 52/56, camo 40 = 50/56, camo 55 = 22/56, camo 70 = 0/56. Median catch time 32 s at camo 20, 40 s at camo 40. By spot (camo 20, 4 trials): chairs_stack 4/4, zinc_fence 0/4, block_steps 0/4, water_tank 1/4; the last three are the golden pockets. Full per-spot tables are in the session log; every other spot was caught 2/2 at camo 20.
- Catch by sight in a tight corner (4.3 m away, behind the lip of the building): lunge at 3.2 s. Far player (8 m): suspicious, then chase, lunge at 5.9 m.
- Spin: telegraph at 21.5 s, spin 22.5 s, end 24.0 s, again 42.4 s; a player 3 m behind is noticed during the spin.
- Prints: walking leaves 0, running on dirt leaves them, none left after 11 s; the masquerade followed an 8-print trail to its end and then looked around.
- Run home: gate stays shut with the masquerade at 10 m from it; at 12+ m, touching it gave `{runHome: 426}` and the round cleared.
- Mock start.ng received exactly `{"score":41,"rounds":0,"camo":0}`.
- 3 full runs, 0 console errors; production bundle starts a round clean and contains none of the debug code. `npm run release` and `check-assets` pass.

**Not verified:** how it feels (the numbers say corners are checked and bad camo gets caught; whether 90 s hunts and the 40-to-70 camo cliff are fun needs hands on a keyboard), real device fps with the new patrol (it costs about 100 to 450 ms once at load), audio by ear (the drum roll is the existing djembe hits sped up), touch.

**Open for you:** confirm Part 2 feels good, then I do 4 (chickens snitch), 5 (memory), 6 (round twists) one at a time. Changing `startng.json` changes the live board's columns; the old rows' meaning (rounds/hidden/camo) may not carry over.

## Quieter background + chickens snitch (dev branch)
**Mix (you said the background hid the egungun and the boju boju chant)**
- Chant channel up to 1.15 (the limiter catches the peaks); ambience channel 0.6 to 0.35, music 0.5 to 0.3, sfx 0.8 to 0.65.
- While a chant line plays the ambience and music drop to 15% (was 35%) and sfx to 40% (was 60%).
- Market chatter clip 0.85 to 0.28 (the "background chatters" you asked to cut a bit more), generator 1 to 0.55, rooster 0.45 to 0.3, horns 0.8 to 0.5.
- Computed from clip loudness: chant about -15 LUFS, market chatter about -48 (about -64 while a line plays), generator about -41 at 2.5 m. Not listened to by ear. Knobs: `MIX_CONFIG` in `src/audio.ts` and the volumes in `startAmbience` in `src/game.ts`.

**Chickens snitch (item 4)**
- A hen within 3 m of the player panics when the masquerade is within 8 m of that hen: it flaps, zigzags and squawks every 0.7 s for 2.6 s; the same hen cannot do it again for about 10 s. The masquerade turns to look at the squawk for 2.4 s (then goes back to its patrol), at most once per 5 s, and only when it is not busy or suspicious. A popup says "A chicken is giving you away!". Only in the hunt. Numbers in `CHICKEN_CONFIG` and `SEEKER_CONFIG.glance*`.
- The squawk is synthesized (`audio.squawk`), a placeholder: a real hen squawk recording should replace it (still no Freesound key in this shell).
- Tested: hen 2 m from the player and the masquerade 6 m from the hen = panic, 3 squawks in 1.5 s, masquerade facing the hen within 7 degrees; masquerade 10 m away = nothing; hen 4 m from the player = nothing; repeat inside the cooldown = nothing; prep (masquerade blind) = nothing; popup shown. 3 full runs, no console errors, production bundle clean.

## Phase 4 continued: real sounds from Freesound (dev branch)
The key is now in the shell (never written to any file; `raw-assets/` is gitignored; I scanned the repo for it). All eight clips are CC0 preview-hq-ogg, logged in CREDITS.md and `raw-assets/audio/SOURCES.json`.
- Hen alarm call: `sfx_hen_squawk_01` (Rudmer_Rotteveel) and `sfx_hen_squawk_02` (Mastersoundboy2005) replace the synthesized squawk; placed where the hen is, pitch varied.
- Hen cluck: `sfx_hen_cluck_01` (D4XX), a random hen every 7 to 16 s, placed in the world.
- The masquerade's costume: `sfx_cloth_swish_01` on every step plus a shekere (`sfx_egungun_rattle_01`, jonopodmore, a Yoruba gourd shaker) or a metal rattle (`sfx_egungun_rattle_02`, zeffon) on about half of them, all spatial: you hear it coming.
- `sfx_spotted_01`: a gasp when it first grows suspicious (once per 3 s).
- `sfx_cloth_rustle_01`: striking a pose.
- Levels: the clips were recorded very differently (the shekere peaks at +4.5 dBFS, the swish is 18 dB quieter), so each call carries its own volume; the limiter catches the rest. Tested that every sound triggers; not listened to by ear.
- Still missing: real recorded chant lines (the YarnGPT2 stand-ins), see the ranked list in the Phase 4 entry above.

## Sounds, memory, round twists, Level 2 the market (dev branch)
**Other sources for the sounds Freesound's CC0 set did not have**
- No CC0 raffia or ankle bells exist there, so `scripts/make-sounds.mjs` synthesizes them (ours, no licence; part of `npm run convert`): `sfx_raffia_01/02` (a swell of papery noise broken into tiny random bursts) and `sfx_bells_01/02` (a cluster of six small brass bells). They play on the masquerade's steps with the cloth swish and the shekere. Not auditioned by ear.
- Added from Freesound (CC0, in CREDITS.md): `amb_rain` (rain loop), `sfx_power_cut`, `sfx_thunder_01`.
- Chant lines: left as the YarnGPT2 placeholders, as you said.

**Item 5, the masquerade's memory** (`src/memory.ts`)
- A heat map over the floor, kept in localStorage (all reads and writes in try/catch): +0.6 heat where it grows suspicious, +1.5 where it catches you, spread over 1.8 m, capped at 3, multiplied by 0.93 every round. The patrol counts heat as extra staleness (150 s per unit) and 60% of the time the first stop of a round is the hottest place. Test: after one catch, the time to first check of that spot with an invisible hider fell from a mean of 30.4 s to 18.9 s over 8 runs each; the memory came back after a page reload.

**Item 6, round twists** (`src/twists.ts`, all numbers in `TWIST_CONFIG`)
- Round 3 NEPA took the light: night (hemisphere 1.3 to 0.42, sun 3.0 to 0.28, dark fog), a power-cut sound, the masquerade carries a lantern with a narrow warm beam (spot light + a lamp in its hand), and sees only in a 34 degree cone out to 9 m, plus anything within 1.8 m.
- Round 4 rain: falling streaks around you, grey dimmer light, a rain loop and thunder every 14 to 28 s; painted clothes wash back towards your start.ng colours (63% gone after 38 s; patterns wash to their average first). Test: red paint went to `#f69300` toward `#f4a300` over 60 s.
- Round 5 a second, smaller masquerade (0.72 scale, 18% faster, narrower cone, 0.45 m body), built the first time it is needed. It shares the first one's patrol, so they claim different stops (0 of 297 samples on the same stop), shares the memory, and either one can catch you. Round 6 on: the second stays, odd rounds are blackouts and even rounds rain.
- Test: a 7-round cycle through all twists, no console errors; the small one catches (forced test).

**Phase 5, Level 2: the market** (`src/levels/market.ts`, `src/levels/ankara.ts`, `src/levels/registry.ts`)
- 30 m by 18 m walled plaza with the same east gate: four fabric stalls against the north wall (hide in the gap between table and cloth), an ankara mural wall, a washing line of cloths, tomato and pepper crates, yams, rice sacks, palm-oil drums, bottle-crate steps, a canteen table with an ankara cloth, a drinks fridge, a MAMA PUT sign, gas cylinders, a container shop, a generator, a keke, an okada, a bus shelter, a water tank, a bush and the zinc fence: 26 hiding spots, every one with a base colour from the surface registry.
- Six original ankara designs drawn on canvas (fans, eyes, diamonds, waves, calabash, chain), each tiling seamlessly; a surface drawn in one has the pattern's average as its base colour.
- Pattern paint: key `T` (or the Pattern button) cycles solid, stripes, dots. With a pattern on, a pick paints stripes or dots of the new colour over the zone's last colour (your own clothes if it was never painted), drawn in the shader from the body position; the camo score reads the average colour, with +35% credit when it is in front of a printed cloth and -12% on a plain surface (`CAMO_CONFIG.patternOnClothCredit`).
- Level select in the lobby: two cards, the choice stored and the page reloaded (only the chosen level's code and textures are downloaded). The leaderboard is one board for both levels.
- Checks: no dead zones and nothing seen from three cells or fewer; bot hiders at every spot and corner (camo 100): 26/26 spots and 48/48 corners after moving the water tank off the fence (the north-east nook behind it was the one that stayed unseen; first check 87 s); catch rate within 2 hunts: camo 20 = 52/52, camo 40 = 44/52. Compound regression: 62/62 corners, 28/28 spots, camo 55 = 22/56 as before.
- Phone: lobby with level cards fits at 390 px; no overlaps, all controls 44 px or more.
- Not verified: how the market feels to play (the stall layout and balance are first guesses), real device fps with the extra draw calls (six cloth batches), the look of the mural and patterns on a real screen beyond my screenshots.
