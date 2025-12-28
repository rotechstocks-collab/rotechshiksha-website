export const characterPoses = {
  PRIYA_POINT: '/characters/poses/priya-point.png',
  PRIYA_THINK: '/characters/poses/priya-think.png',
  PRIYA_CLIPBOARD: '/characters/poses/priya-clipboard.png',
  PRIYA_SMILE: '/characters/poses/priya-smile.png',
  ROHIT_CONFUSED: '/characters/poses/rohit-confused.png',
  ROHIT_THUMB: '/characters/poses/rohit-thumb.png',
  ROHIT_IDEA: '/characters/poses/rohit-idea.png',
  ROHIT_WRITE: '/characters/poses/rohit-write.png',
} as const;

export type PriyaPose = 'point' | 'think' | 'clipboard' | 'smile';
export type RohitPose = 'confused' | 'thumb' | 'idea' | 'write';
export type CharacterPose = PriyaPose | RohitPose;

export function getPoseUrl(character: 'priya' | 'rohit', pose: string): string {
  const key = `${character.toUpperCase()}_${pose.toUpperCase()}` as keyof typeof characterPoses;
  return characterPoses[key] || characterPoses.PRIYA_SMILE;
}
