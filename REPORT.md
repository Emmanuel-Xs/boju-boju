# Boju Boju: summary report

**What it is.** A three.js hide-and-seek game for start.ng with Nigerian theming. You paint your clothes to match the wall behind you, and a Yoruba egungun masquerade, who counts with its eyes covered while children chant "Ṣé kí n ṣí i?", hunts you. Live at https://boju-boju.start.ng, source at https://github.com/Emmanuel-Xs/boju-boju (`main` is what start.ng deploys; work happens on `dev`).

**Size.** Vite 8, TypeScript, three.js 0.186 (no other runtime dependency). About 12,500 lines of source. The committed `dist/` is 136 files, 3.90 MB; a level and its textures only download when that level is chosen.

## How a run works
- Lobby (your start.ng face, name, best run, level select, the board) then prep (the chant plays, you hide and paint, Ready ends it early for points), then a 90 s hunt, then cleared or caught, then results. Each cleared round sharpens the masquerade (wider cone, faster suspicion) within limits; being caught ends the run.
- Controls: WASD, Shift, Space; E eyedropper, Q zone, P palette, 1 to 4 poses, T pattern (stripes, dots), U school uniform. Touch has buttons for all of it.
- **Score** = survival (2/s) + near misses (8/s in the cone, not caught) + Ready early + run home bonus + camo bonus. Run home: when the masquerade is more than 12 m from the gate, the gate glows and touching it ends the round with a bonus.
- **start.ng**: the `camo` stat is the best score you held for 3 seconds in a row; signed-in players get their own character, name and face; scores save after every cleared round and at the end of a run; the board ranks by `score`, then `rounds`, then `camo` (`public/startng.json`). Guests can play; no reply from start.ng means a local guest. The lobby never waits on start.ng.

## The masquerade (`src/seeker.ts`, `src/patrol.ts`, `src/nav.ts`, `src/memory.ts`)
- Round 1 teaches: 25% slower, slower to suspect, no spin sweep, with short hints. After you win three rounds from the same spot (this browser only) it goes there first.
- Senses: a vision cone with raycast line of sight, hearing, fresh footprints (it follows the trail), a periodic spin sweep (1 s drum-roll warning, then 360 degree vision within 5 m), a hen that spots you within 4 m and squawks (it turns to look if it is within 14 m).
- **Catching is by sight**: suspicion full and you visible within 6 m triggers the lunge; further away it closes in first.
- Patrol: every floor cell has an age; it walks to whichever stop refreshes the most stale floor per second of walking (corners, hiding spots and extra cover stops), so no corner is safe. It remembers where it caught or suspected you (localStorage) and checks those first next time.
- A* on a 0.5 m grid, 0.6 m capsule body; cloth panels never collide.

## Levels
| Level | What it is | Hiding spots |
|---|---|---|
| The Compound | a Lagos yard: rooms, a danfo, drums, a zinc fence | 28 |
| The Market | stalls hung with six original ankara designs, produce, a keke | 26 |
| The Classroom | desks, chalkboard, lockers, bookcases; the masquerade is 20% slower with a cone 25% narrower and 10% shorter, and there are no chickens | 19 |

Round twists, on every level: round 3 NEPA took the light (night, the masquerade carries a lantern), round 4 rain (your paint washes back to your clothes), round 5 a second, smaller masquerade; after that the second stays and blackouts and rain alternate.

## Sound
Chant lines (placeholder YarnGPT2 voices) sit above everything and the rest ducks while they play; real Freesound CC0 recordings for hens, the shekere, cloth, rain, thunder and a power cut; Kenney CC0 steps and clicks; our own synthesized raffia and ankle bells. Every file is logged in `CREDITS.md`.

## How it was tested (headless Chrome, software rendering)
- Bot hiders camped in every corner and every hiding spot for two 90 s hunts with camo pinned at 100 (so nothing gets caught, only "was this place looked at"): Compound 62/62 corners and 28/28 spots; Market 48/48 and 26/26; Classroom 66/66 and 19/19. No dead zones on any level.
- Catch rate with a stationary hider (84 trials per setting on the compound, caught within one 90 s hunt), round 2 at camo 30 / 40 / 50 / 60 / 70: 81% / 73% / 48% / 21% / 8%. Round 1 (the teaching round, slower and gentler) at camo 40: 27% caught. Market and classroom are within a few points of the compound at the same settings (classroom a little easier on purpose).
- `npm test` runs 16 unit tests (the camo hold stat, the suspicion curve, remembered hiding places).
- Every change went `dev` then release (`npm run release`), `scripts/check-assets.mjs`, three full runs with no console errors, a production-bundle check (no debug code shipped), `/games/check` on `dev`, then a fast-forward merge to `main` and `/games/check` again. Phone layout checked at 390 x 844 (no overlaps, every control 44 px or more).

## What I could not verify
How it feels to play (round length, the camo difficulty cliff between 40 and 70, the classroom balance), real device frame rate (auto quality steps down below 45 fps, tested only on software rendering), all audio by ear, touch feel, and the real start.ng board and sign-in (tested against a mock connect page, then live only as far as the publish and check calls).

## Open items
1. **Chant recordings.** Re-record in this order: `chant_ask`, `chant_not_yet`, `chant_intro`, `caught`, `chant_open`, `chant_hunt`; have a Yoruba speaker check the English glosses under the lyrics.
2. **Freesound key** was used in a shell session and never written to a file; rotate it.
3. **Leaderboard columns changed** (score, rounds, camo instead of rounds, hidden, camo); old rows may not carry over. One board covers all three levels.
4. **Painting, patterns and the uniform** change how your character looks during prep and the hunt (reset every round). Tell me if that should be restricted.
5. The market's and classroom's layouts and balance are first guesses.

## Where the numbers live
`RUN_CONFIG` (`src/run.ts`) rounds, scoring, run home, the teaching round, the camo hold time, remembered wins; `HIDEOUT_CONFIG` (`src/hideouts.ts`); `CHICKEN_CONFIG` (`src/levels/chickens.ts`) hens; `SEEKER_CONFIG` (`src/seeker.ts`) senses, speeds, catch range, spin, the camo-to-suspicion curve; `PATROL_CONFIG` and `MEMORY_CONFIG`; `TWIST_CONFIG` (`src/twists.ts`); `CAMO_CONFIG` (`src/camo.ts`); `MIX_CONFIG` (`src/audio.ts`); per-level tuning (`seekerTuning`, `chickenCount`, `ambience`) in each level file. `PROGRESS.md` is the full log by phase, with every test result.
