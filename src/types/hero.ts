import type { CtaAction } from "./cta";

export interface HeroImage {
  src: string;
  alt?: string;
}

export interface HeroProps {
  eyebrow?: string;
  title: string;
  content?: string;
  body?: string;
  ctas?: CtaAction[];
  image?: HeroImage;
  align?: "start" | "center";
  backgroundOverlay?: boolean;
}
