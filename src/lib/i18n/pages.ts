import { getCollection, type CollectionEntry } from "astro:content";
import type { AlternateLink } from "@app-types/seo";
import {
  DEFAULT_LOCALE,
  type Locale,
  localizePath,
} from "./locales";

type PageEntry = CollectionEntry<"pages">;
type PageTranslations = Map<Locale, PageEntry>;

let pagesCache: Promise<Map<string, PageTranslations>> | undefined;

const normalizeSlug = (value: string | undefined | null): string | undefined => {
  if (!value) return undefined;
  const trimmed = value.trim().replace(/^\/+|\/+$/g, "");
  return trimmed.length > 0 ? trimmed : undefined;
};

const fallbackSlug = (entry: PageEntry): string => {
  const parts = entry.slug.split("/");
  return parts[parts.length - 1] ?? entry.slug;
};

export const getPageSlug = (entry: PageEntry): string => {
  return normalizeSlug(entry.data.slug) ?? fallbackSlug(entry);
};

const resolvePathForEntry = (
  translationKey: string,
  entry: PageEntry,
): string => {
  if (translationKey === "home") {
    return "/";
  }

  const slug = getPageSlug(entry);
  return slug ? `/${slug}` : "/";
};

const buildPagesCache = async () => {
  const pages = await getCollection(
    "pages",
    ({ data }) => !data.draft && Boolean(data.translationKey),
  );

  const map = new Map<string, PageTranslations>();

  for (const entry of pages) {
    const key = entry.data.translationKey;
    if (!key) continue;

    const locale = entry.data.lang ?? DEFAULT_LOCALE;
    if (!map.has(key)) {
      map.set(key, new Map());
    }

    map.get(key)!.set(locale, entry);
  }

  return map;
};

export const getPageTranslations = async (): Promise<Map<string, PageTranslations>> => {
  if (!pagesCache) {
    pagesCache = buildPagesCache();
  }
  return pagesCache.then((map) => new Map(map));
};

export const getPageTranslationsByKey = async (
  translationKey: string,
): Promise<PageTranslations | undefined> => {
  const map = await getPageTranslations();
  return map.get(translationKey);
};

export interface LocalizedPageResult {
  entry: PageEntry;
  locale: Locale;
  path: string;
  url: string;
  alternates: AlternateLink[];
  translations: PageTranslations;
  translationKey: string;
}

export const buildAlternates = (
  translationKey: string,
  translations: PageTranslations,
): AlternateLink[] => {
  return Array.from(translations.entries()).map(([locale, entry]) => {
    const path = resolvePathForEntry(translationKey, entry);
    return {
      locale,
      path,
      url: localizePath(path, locale),
      label: entry.data.title,
    };
  });
};

export const getLocalizedPage = async (
  translationKey: string,
  requestedLocale: Locale,
): Promise<LocalizedPageResult | undefined> => {
  const translations = await getPageTranslationsByKey(translationKey);
  if (!translations || translations.size === 0) {
    return undefined;
  }

  const entry =
    translations.get(requestedLocale) ??
    translations.get(DEFAULT_LOCALE);

  if (!entry) {
    return undefined;
  }

  const effectiveLocale = entry.data.lang ?? DEFAULT_LOCALE;
  const path = resolvePathForEntry(translationKey, entry);
  const url = localizePath(path, effectiveLocale);
  const alternates = buildAlternates(translationKey, translations);

  return {
    entry,
    locale: effectiveLocale,
    path,
    url,
    alternates,
    translations,
    translationKey,
  };
};

export const listDefaultLocaleSlugs = async (): Promise<
Array<{ translationKey: string; slug: string; path: string }>
> => {
  const map = await getPageTranslations();
  const results: Array<{ translationKey: string; slug: string; path: string }> = [];

  for (const [translationKey, translations] of map.entries()) {
    const entry = translations.get(DEFAULT_LOCALE);
    if (!entry) continue;
    const slug = getPageSlug(entry);
    const path = resolvePathForEntry(translationKey, entry);
    results.push({ translationKey, slug, path });
  }

  return results;
};

export const resolveDefaultLocaleRedirect = async (slug: string | undefined): Promise<string> => {
  const normalizedSlug = (slug ?? "").replace(/^\/+|\/+$/g, "");
  const pages = await listDefaultLocaleSlugs();
  const targetPath = pages.find(({ slug: candidate }) => candidate === normalizedSlug)?.path ?? "/";
  return localizePath(targetPath, DEFAULT_LOCALE);
};
