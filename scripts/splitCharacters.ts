import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SPRITE_PATH = path.join(__dirname, '../client/public/characters/sprite.png');
const OUTPUT_DIR = path.join(__dirname, '../client/public/characters/poses');

const POSE_NAMES = [
  ['priya-point', 'priya-think', 'priya-clipboard', 'priya-smile'],
  ['rohit-confused', 'rohit-thumb', 'rohit-idea', 'rohit-write']
];

async function splitAndTrimSprite() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const image = sharp(SPRITE_PATH);
  const metadata = await image.metadata();
  
  if (!metadata.width || !metadata.height) {
    throw new Error('Could not read sprite dimensions');
  }

  const cols = 4;
  const rows = 2;
  const cellWidth = Math.floor(metadata.width / cols);
  const cellHeight = Math.floor(metadata.height / rows);

  console.log(`Sprite size: ${metadata.width}x${metadata.height}`);
  console.log(`Cell size: ${cellWidth}x${cellHeight}`);
  console.log(`Grid: ${cols}x${rows} (${cols * rows} poses)`);
  console.log('');

  const exportedPoses: string[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const poseName = POSE_NAMES[row][col];
      const outputPath = path.join(OUTPUT_DIR, `${poseName}.png`);

      const left = col * cellWidth;
      const top = row * cellHeight;

      try {
        const extracted = sharp(SPRITE_PATH)
          .extract({ left, top, width: cellWidth, height: cellHeight });
        
        try {
          await extracted.clone().trim().png().toFile(outputPath);
        } catch {
          await extracted.clone().png().toFile(outputPath);
          console.log(`Note: ${poseName} saved without trim (may be empty or have issues)`);
        }

        const outputMeta = await sharp(outputPath).metadata();
        console.log(`Created: ${poseName}.png (${outputMeta.width}x${outputMeta.height})`);
        exportedPoses.push(poseName);
      } catch (err) {
        console.error(`Error processing ${poseName}:`, err);
      }
    }
  }

  const indexContent = `export const characterPoses = {
${exportedPoses.map(name => {
  const varName = name.replace(/-/g, '_').toUpperCase();
  return `  ${varName}: '/characters/poses/${name}.png',`;
}).join('\n')}
} as const;

export type PriyaPose = 'point' | 'think' | 'clipboard' | 'smile';
export type RohitPose = 'confused' | 'thumb' | 'idea' | 'write';
export type CharacterPose = PriyaPose | RohitPose;

export function getPoseUrl(character: 'priya' | 'rohit', pose: string): string {
  const key = \`\${character.toUpperCase()}_\${pose.toUpperCase()}\` as keyof typeof characterPoses;
  return characterPoses[key] || characterPoses.PRIYA_SMILE;
}
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent);
  console.log('\nCreated: index.ts');
  console.log('\nDone! All poses extracted and trimmed.');
}

splitAndTrimSprite().catch(console.error);
