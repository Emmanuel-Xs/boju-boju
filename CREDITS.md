# Credits

Every third-party asset used in Boju Boju. All of it is CC0 1.0 (public domain); credit is not required but given.
Licence files sit next to the raw downloads (`raw-assets/packs/<pack>/License.txt`, `raw-assets/textures/<id>/LICENSE-CC0.txt`; `raw-assets/` is gitignored).

## Models (Kenney, https://kenney.nl, CC0 1.0: https://creativecommons.org/publicdomain/zero/1.0/)

| Pack | Source URL | Used as |
| --- | --- | --- |
| City Kit (Suburban) 2.0 | https://kenney.nl/assets/city-kit-suburban | `public/models/sub_*.json` |
| Car Kit | https://kenney.nl/assets/car-kit | `public/models/car_*.json` |
| Furniture Kit 2.0 | https://kenney.nl/assets/furniture-kit | `public/models/furn_*.json` |
| Survival Kit | https://kenney.nl/assets/survival-kit | `public/models/surv_*.json` |
| Nature Kit | https://kenney.nl/assets/nature-kit | `public/models/nat_*.json` |

## Textures (ambientCG, https://ambientcg.com, CC0 1.0: https://docs.ambientcg.com/license/)

Colour maps only, 1K JPG downscaled to 512 px webp in `public/textures/surfaces/`.

| File | ambientCG asset | Source URL |
| --- | --- | --- |
| plaster_wall.webp | Plaster002 | https://ambientcg.com/view?id=Plaster002 |
| painted_concrete.webp | PaintedPlaster006 | https://ambientcg.com/view?id=PaintedPlaster006 |
| corrugated_metal.webp | CorrugatedSteel005 | https://ambientcg.com/view?id=CorrugatedSteel005 |
| rusty_metal.webp | Metal021 | https://ambientcg.com/view?id=Metal021 |
| dirt_ground.webp | Ground109 | https://ambientcg.com/view?id=Ground109 |
| sand.webp | Ground080 | https://ambientcg.com/view?id=Ground080 |
| old_wood.webp | Wood035 | https://ambientcg.com/view?id=Wood035 |
| cracked_tiles.webp | Tiles133C | https://ambientcg.com/view?id=Tiles133C |

## Audio (Kenney, https://kenney.nl, CC0 1.0)

| Pack | Source URL | Used as |
| --- | --- | --- |
| Impact Sounds | https://kenney.nl/assets/impact-sounds | `sfx_step_concrete_*`, `sfx_hit_*`, `sfx_caught_thump` |
| RPG Audio | https://kenney.nl/assets/rpg-audio | `sfx_step_sand_*` (stand-in, see below) |
| Interface Sounds | https://kenney.nl/assets/interface-sounds | `sfx_ui_*` |
| Music Jingles | https://kenney.nl/assets/music-jingles | `jingle_win`, `jingle_caught` |

`sfx_step_sand_*` are Kenney's leather-on-dirt footsteps; Kenney has no sand set.

## Audio (Freesound, CC0 only, fetched via the API as preview-hq-ogg)

Licence for each: Creative Commons 0 (https://creativecommons.org/publicdomain/zero/1.0/). Provenance is also kept in `raw-assets/audio/SOURCES.json`.

| Used as | Sound | Author | Source URL |
| --- | --- | --- | --- |
| drum_hit_01.ogg | Djembe Bass | PanPiper5 | https://freesound.org/people/PanPiper5/sounds/659911/ |
| drum_hit_02.ogg | Djembe Slap | PanPiper5 | https://freesound.org/people/PanPiper5/sounds/659910/ |
| drum_hit_03.ogg | Djembe Hit 5 Center | carlmartin | https://freesound.org/people/carlmartin/sounds/158962/ |
| drum_loop.ogg | Djembe Loop 12 - 120 BPM | Ancient.Sounds | https://freesound.org/people/Ancient.Sounds/sounds/485400/ |
| amb_market.ogg | people talking at street market | andrebola | https://freesound.org/people/andrebola/sounds/346960/ |
| amb_generator.ogg | Yukon Energy diesel back-up generators | SoundsLikeYukon | https://freesound.org/people/SoundsLikeYukon/sounds/720416/ |
| sfx_rooster_01.ogg | Rooster Crow 1 | BenjaminNelan | https://freesound.org/people/BenjaminNelan/sounds/435508/ |
| sfx_horn_motorbike_01.ogg | 13FMikovaA_jawa klakson | 13FPanska_Mikova_Adela | https://freesound.org/people/13FPanska_Mikova_Adela/sounds/378336/ |
| sfx_horn_motorbike_02.ogg | 13FMikovaA_simson klakson | 13FPanska_Mikova_Adela | https://freesound.org/people/13FPanska_Mikova_Adela/sounds/378351/ |

## Placeholder chant voices

Placeholder voices generated with YarnGPT2 by Saheed Niyi (Apache 2.0): https://huggingface.co/saheedniyi/YarnGPT2

Used as `chant_intro`, `chant_ask`, `chant_not_yet`, `chant_open`, `chant_hunt` and `caught` in `public/audio/`, pitch-shifted and mixed with ffmpeg. They are stand-ins until real recordings replace them.

## Libraries

| Library | Licence |
| --- | --- |
| three.js (https://threejs.org) | MIT |
| glTF-Transform (https://gltf-transform.dev) | MIT |
| sharp (https://sharp.pixelplumbing.com) | Apache-2.0 |
| Vite (https://vite.dev) | MIT |
