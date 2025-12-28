import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function removeWhiteBackground(inputPath: string, outputPath: string) {
  try {
    const image = sharp(inputPath);
    
    const { data, info } = await image
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    const threshold = 240;
    const channels = info.channels;
    
    if (channels === 3) {
      const newData = Buffer.alloc(info.width * info.height * 4);
      for (let i = 0; i < info.width * info.height; i++) {
        const r = data[i * 3];
        const g = data[i * 3 + 1];
        const b = data[i * 3 + 2];
        
        newData[i * 4] = r;
        newData[i * 4 + 1] = g;
        newData[i * 4 + 2] = b;
        
        if (r >= threshold && g >= threshold && b >= threshold) {
          newData[i * 4 + 3] = 0;
        } else {
          newData[i * 4 + 3] = 255;
        }
      }
      
      await sharp(newData, {
        raw: { width: info.width, height: info.height, channels: 4 }
      })
        .png()
        .toFile(outputPath);
    } else if (channels === 4) {
      const newData = Buffer.from(data);
      for (let i = 0; i < info.width * info.height; i++) {
        const r = newData[i * 4];
        const g = newData[i * 4 + 1];
        const b = newData[i * 4 + 2];
        
        if (r >= threshold && g >= threshold && b >= threshold) {
          newData[i * 4 + 3] = 0;
        }
      }
      
      await sharp(newData, {
        raw: { width: info.width, height: info.height, channels: 4 }
      })
        .png()
        .toFile(outputPath);
    }
    
    console.log('Created:', outputPath);
  } catch (err: any) {
    console.error('Error processing', inputPath, ':', err.message);
  }
}

async function main() {
  const basePath = path.join(__dirname, '../client/public/characters');
  
  await removeWhiteBackground(
    path.join(basePath, 'priya.png'),
    path.join(basePath, 'priya_transparent.png')
  );
  
  await removeWhiteBackground(
    path.join(basePath, 'rohit.png'),
    path.join(basePath, 'rohit_transparent.png')
  );
}

main();
