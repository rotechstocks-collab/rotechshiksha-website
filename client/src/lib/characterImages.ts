import priyaAvatar from "@/assets/characters/priya_main_transparent.png";
import rohitAvatar from "@/assets/characters/rohit_main_transparent.png";

export const characterImages = {
  priya: {
    default: priyaAvatar,
    point: priyaAvatar,
    think: priyaAvatar,
    clipboard: priyaAvatar,
  },
  rohit: {
    default: rohitAvatar,
    confused: rohitAvatar,
    idea: rohitAvatar,
    write: rohitAvatar,
  }
} as const;

export type CharacterName = keyof typeof characterImages;
export type PriyaPose = keyof typeof characterImages.priya;
export type RohitPose = keyof typeof characterImages.rohit;
