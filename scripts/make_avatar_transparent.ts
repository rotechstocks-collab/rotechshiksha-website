import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const assetsDir = path.join(process.cwd(), 'client/src/assets/characters');

async function makeTransparent(inputFile: string, outputFile: string) {
  const inputPath = path.join(assetsDir, inputFile);
  const outputPath = path.join(assetsDir, outputFile);
  
  console.log(`Processing ${inputFile}...`);
  
  const image = sharp(inputPath);
  const { width, height } = await image.metadata();
  
  if (!width || !height) {
    throw new Error('Could not get image dimensions');
  }
  
  // Get raw pixel data
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  // Process each pixel - make white/near-white pixels transparent
  const threshold = 240; // Pixels with R, G, B all above this become transparent
  const edgeThreshold = 220; // Slightly more aggressive for edge detection
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Check if pixel is white or near-white
    if (r > threshold && g > threshold && b > threshold) {
      data[i + 3] = 0; // Set alpha to 0 (fully transparent)
    } else if (r > edgeThreshold && g > edgeThreshold && b > edgeThreshold) {
      // Semi-transparent for edge pixels to smooth the transition
      const minVal = Math.min(r, g, b);
      const alpha = Math.max(0, 255 - Math.floor((minVal - edgeThreshold) * (255 / (threshold - edgeThreshold))));
      data[i + 3] = Math.min(data[i + 3], alpha);
    }
  }
  
  // Write the processed image
  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
    .png()
    .toFile(outputPath);
  
  console.log(`Created ${outputFile}`);
}

async function main() {
  try {
    await makeTransparent('priya_main.png', 'priya_main_transparent.png');
    await makeTransparent('rohit_main.png', 'rohit_main_transparent.png');
    console.log('Done! Transparent avatars created.');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
