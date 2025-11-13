const DECLARED_LOCALES = ["fr", "en"] as const;

export type Locale = (typeof DECLARED_LOCALES)[number];

const normalizeBoolean = (value: string | undefined): boolean => {
  if (!value) return true;
  return !["0", "false", "off", "no"].includes(value.trim().toLowerCase());
};

export const I18N_ENABLED = normalizeBoolean(import.meta.env.PUBLIC_I18N_ENABLED);

export const SUPPORTED_LOCALES = DECLARED_LOCALES;

export const DEFAULT_LOCALE: Locale = "fr";
export const FALLBACK_LOCALE: Locale = DEFAULT_LOCALE;
export const ACTIVE_LOCALES: Locale[] = I18N_ENABLED
  ? [...SUPPORTED_LOCALES]
  : [DEFAULT_LOCALE];

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

export const LOCALE_SHORT_LABELS: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
};

const EXTERNAL_URL_PATTERN = /^(?:[a-z+]+:)?\/\//i;

export const isLocale = (value: string | undefined): value is Locale =>
  typeof value === "string" &&
  ACTIVE_LOCALES.includes(value as Locale);

export const resolveLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : DEFAULT_LOCALE;

export const isInternalHref = (href: string): boolean =>
  typeof href === "string" &&
  !EXTERNAL_URL_PATTERN.test(href) &&
  !href.startsWith("mailto:") &&
  !href.startsWith("tel:");

const ensureLeadingSlash = (path: string): string =>
  path.startsWith("/") ? path : `/${path}`;

const ensureTrailingSlash = (path: string): string =>
  path.endsWith("/") ? path : `${path}/`;

const sanitizePath = (path: string | undefined): string => {
  if (!path) return "/";
  const [segment, rest] = path.split(/([?#].*)/, 2);
  const normalized = segment
    ? ensureLeadingSlash(segment)
    : "/";
  return rest ? `${normalized}${rest}` : normalized;
};

export const localizePath = (
  href: string,
  locale: Locale,
): string => {
  if (!I18N_ENABLED) {
    return sanitizePath(href);
  }

  if (!href) {
    return ensureTrailingSlash(`/${locale}`);
  }

  if (!isInternalHref(href)) {
    return href;
  }

  const sanitized = sanitizePath(href);

  if (
    sanitized === `/${locale}` ||
    sanitized === `/${locale}/` ||
    sanitized.startsWith(`/${locale}/`)
  ) {
    return sanitized;
  }

  if (sanitized === "/") {
    return ensureTrailingSlash(`/${locale}`);
  }

  return `/${locale}${sanitized}`;
};

export const stripLocaleFromPath = (
  path: string,
  locale?: Locale,
): string => {
  if (!path) return "/";
  const sanitized = sanitizePath(path);

  if (!I18N_ENABLED) {
    return sanitized;
  }

  const localesToCheck = locale ? [locale] : ACTIVE_LOCALES;

  for (const code of localesToCheck) {
    if (sanitized === `/${code}` || sanitized === `/${code}/`) {
      return "/";
    }

    if (sanitized.startsWith(`/${code}/`)) {
      const remainder = sanitized.slice(code.length + 1);
      return remainder.startsWith("/") ? remainder : `/${remainder}`;
    }
  }

  return sanitized;
};

export const toHreflang = (locale: Locale): string => {
  switch (locale) {
    case "fr":
      return "fr-FR";
    case "en":
      return "en-US";
    default:
      return locale;
  }
};

export const toOpenGraphLocale = (locale: Locale): string | undefined => {
  switch (locale) {
    case "fr":
      return "fr_FR";
    case "en":
      return "en_US";
    default:
      return undefined;
  }
};
