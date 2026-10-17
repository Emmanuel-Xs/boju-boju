// Dev-only pages (public/debug/) are not shipped: remove them from dist/ after the build.
import { rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
await rm(path.join(root, 'dist/debug'), { recursive: true, force: true });
