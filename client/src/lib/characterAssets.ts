export const characterAssets = {
  avatars: {
    priya: "/characters/avatars/priya.png",
    rohit: "/characters/avatars/rohit.png",
  },
  poses: {
    priya: {
      smile: "/characters/poses/priya-smile.png",
      point: "/characters/poses/priya-point.png",
      think: "/characters/poses/priya-think.png",
      clipboard: "/characters/poses/priya-clipboard.png",
    },
    rohit: {
      thumb: "/characters/poses/rohit-thumb.png",
      confused: "/characters/poses/rohit-confused.png",
      idea: "/characters/poses/rohit-idea.png",
      write: "/characters/poses/rohit-write.png",
    }
  }
} as const;

export type CharacterName = keyof typeof characterAssets.avatars;
export type PriyaPose = keyof typeof characterAssets.poses.priya;
export type RohitPose = keyof typeof characterAssets.poses.rohit;
