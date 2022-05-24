import { mkdir, readdir, rm, writeFile } from 'fs/promises';
import { createRequire } from 'module';
import { canvasRGBA } from "stackblur-canvas";
const require = createRequire(import.meta.url);
const { Canvas, loadImage } = require('canvas');

await mkdir('./out', { recursive: true })
await rm('./out/backgrounds', { force: true, recursive: true })
await mkdir('./out/backgrounds', { recursive: true })

const backgrounds = await readdir('backgrounds');

const renderBackgrounds = backgrounds.map(async backgroundPath => {
  const background = await loadImage(`./backgrounds/${backgroundPath}`);

  const canvas = new Canvas(background.width, background.height, 'image');
  const ctx = canvas.getContext('2d');
  ctx.drawImage(background, 0, 0);

  canvasRGBA(canvas, 0, 0, canvas.width, canvas.height, 13);

  await writeFile(`./out/backgrounds/${backgroundPath}`, canvas.toBuffer());
});

await Promise.all(renderBackgrounds);