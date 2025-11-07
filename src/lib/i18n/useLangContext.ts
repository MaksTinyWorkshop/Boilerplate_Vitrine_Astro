import { DEFAULT_LOCALE, resolveLocale } from "@lib/i18n/locales";
import { getSiteConfig } from "@lib/siteData";

export function useLangContext(Astro: any) {
  const urlSeg = Astro.url?.pathname?.split("/")[1] || undefined;
  const locale = resolveLocale(urlSeg || Astro.currentLocale || DEFAULT_LOCALE);
  const siteContent = getSiteConfig(locale);

  return { locale, siteContent };
}
