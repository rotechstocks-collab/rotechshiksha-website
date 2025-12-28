export const characterImages = {
  priya: {
    default: "/characters/poses/priya-smile.png",
    point: "/characters/poses/priya-point.png",
    think: "/characters/poses/priya-think.png",
    clipboard: "/characters/poses/priya-clipboard.png",
  },
  rohit: {
    default: "/characters/poses/rohit-thumb.png",
    confused: "/characters/poses/rohit-confused.png",
    idea: "/characters/poses/rohit-idea.png",
    write: "/characters/poses/rohit-write.png",
  }
} as const;

export type CharacterName = keyof typeof characterImages;
export type PriyaPose = keyof typeof characterImages.priya;
export type RohitPose = keyof typeof characterImages.rohit;
