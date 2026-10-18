# Boju Boju: progress log

Resume notes for whoever (or whichever session) picks this up. Newest entry last. Dev server: `npx vite --port 5173 --strictPort --host 127.0.0.1`. Release: `npm run release`.

## Before the phases (summary of what existed)
Compound level (`src/levels/compound.ts`), procedural player and egungun masquerade, hiding and painting (`src/levels/hiding.ts`, `src/camo.ts`), seeker AI (`src/seeker.ts`), chickens, container shop, round flow with chant lyrics. All tuning numbers are in config objects at the top of their files.

## Phase 0: safety and housekeeping (done)
- Searched the working tree and all 11 commits (`git rev-list --all`) for FREESOUND_API_KEY values, api_key / secret / bearer / password patterns, and 32+ and 40+ character hex/base64 strings outside `public/models`: nothing. The only hit is `scripts/fetch-freesound.mjs`, which reads `process.env.FREESOUND_API_KEY` and stores nothing.
- `raw-assets/` is gitignored (`.gitignore:2`) and no path under it appears in any commit; nothing under `references/` ever committed; no `.env`/`.pem`/credentials files in history.
- Pushed the 5 unpushed commits (`cf2a73d..fea6c05`). `POST /games/check`: `ok: true`, 114 files, 3.1 MB, warnings `no_cover` and `no_start_ng_player` only (both are Phase 2/3 work).
- Open: none.
