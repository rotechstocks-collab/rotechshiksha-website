import priyaAvatar from "@/assets/characters/priya_main_transparent.png";
import rohitAvatar from "@/assets/characters/rohit_main_transparent.png";

export const characterAssets = {
  avatars: {
    priya: priyaAvatar,
    rohit: rohitAvatar,
  },
  poses: {
    priya: {
      smile: priyaAvatar,
      point: priyaAvatar,
      think: priyaAvatar,
      clipboard: priyaAvatar,
    },
    rohit: {
      thumb: rohitAvatar,
      confused: rohitAvatar,
      idea: rohitAvatar,
      write: rohitAvatar,
    }
  }
} as const;

export type CharacterName = keyof typeof characterAssets.avatars;
export type PriyaPose = keyof typeof characterAssets.poses.priya;
export type RohitPose = keyof typeof characterAssets.poses.rohit;
