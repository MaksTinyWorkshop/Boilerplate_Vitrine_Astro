import type { IconProps } from "@components/Icons/icon";

export type CtaIconProps = Partial<IconProps>;

export type CtaAction = {
  label: string;
  href: string;
  icon?: IconProps["type"];
  iconProps?: CtaIconProps;
  target?: "_blank" | "_self";
  rel?: string;
};

export type CTASectionVariant = "banner" | "download" | "text-only" | "card" | "action-button";

export type CTASectionTheme = "light" | "dark" | "accent";

export type CTASectionAlignment = "start" | "center" | "end";

export interface CTASectionProps {
  variant?: CTASectionVariant;
  eyebrow?: string;
  title?: string;
  description?: string;
  body?: string;
  note?: string;
  actions?: CtaAction[];
  media?: {
    src: string;
    alt?: string;
  };
  download?: {
    label: string;
    href: string;
    name?: string;
  };
  align?: CTASectionAlignment;
  theme?: CTASectionTheme;
}

export interface CTAtoCallbackProps {
  label?: string;
}
