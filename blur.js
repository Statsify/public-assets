/**
 * Copyright (c) Statsify
 *
 * This source code is licensed under the GNU GPL v3 license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/Statsify/statsify/blob/main/LICENSE
 */

import { canvasRGBA } from "stackblur-canvas";
import { createRequire } from "node:module";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
const require = createRequire(import.meta.url);
const { Canvas, loadImage } = require("canvas");

await mkdir("./out", { recursive: true });
await rm("./out/backgrounds", { force: true, recursive: true });
await mkdir("./out/backgrounds", { recursive: true });

const backgrounds = await readdir("backgrounds");

const renderBackgrounds = backgrounds.map(async (backgroundPath) => {
  const background = await loadImage(`./backgrounds/${backgroundPath}`);

  const canvas = new Canvas(background.width, background.height, "image");
  const ctx = canvas.getContext("2d");
  ctx.drawImage(background, 0, 0);

  canvasRGBA(canvas, 0, 0, canvas.width, canvas.height, 13);

  await writeFile(`./out/backgrounds/${backgroundPath}`, canvas.toBuffer());
});

await Promise.all(renderBackgrounds);
