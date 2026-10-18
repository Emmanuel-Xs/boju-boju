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
