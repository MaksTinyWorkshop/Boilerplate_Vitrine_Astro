import type { IconName } from "./map";

export type IconProps<Name extends string = IconName> = {
  type: Name | string;
  size?: number;
  color?: string;
  theme?: "info" | "success" | "warning" | "alert";
  iconSet?: Record<string, string>;
};
