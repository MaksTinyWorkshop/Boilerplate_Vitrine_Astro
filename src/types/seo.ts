import type { Locale } from "@lib/i18n/locales";

export interface OpenGraphMeta {
  title?: string;
  description?: string;
  type?: string;
  image?: string;
  imageAlt?: string;
}

export interface TwitterMeta {
  card?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  site?: string;
  creator?: string;
}

export interface StructuredData {
  [key: string]: unknown;
}

export interface AlternateLink {
  locale: Locale | string;
  path?: string;
  url?: string;
  label?: string;
  hreflang?: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  keywords?: string[] | string;
  openGraph?: OpenGraphMeta;
  twitter?: TwitterMeta;
  structuredData?: StructuredData | StructuredData[];
  noindex?: boolean;
  additionalMeta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  alternates?: AlternateLink[];
}
