import type { Locale } from "@lib/i18n/locales";
import type { SiteConfig } from "@lib/siteData";
import type { AlternateLink, SEOProps } from "./seo";

export interface BaseLayoutProps {
  title?: string;
  description?: string;
  seo?: SEOProps;
  lang?: Locale;
  locale?: Locale;
  site?: SiteConfig;
  alternates?: AlternateLink[];
}
