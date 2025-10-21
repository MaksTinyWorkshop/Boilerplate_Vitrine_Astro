import type { IconProps } from "@components/Icons/icon";

export type FeatureIcon = IconProps["type"];

export interface FeatureImage {
  src: string;
  alt?: string;
}

export interface FeatureItem {
  title: string;
  description?: string;
  icon?: FeatureIcon;
  image?: FeatureImage;
}

export type FeatureLayout = "grid" | "list";
export type FeatureTheme = "light" | "dark" | "accent";

export interface FeatureSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  display?: FeatureLayout;
  theme?: FeatureTheme;
  features: FeatureItem[];
}
