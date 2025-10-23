type ThemeConfig = {
  defaultTheme?: string;
  themes?: Record<string, string>;
};

type ThemeRuntime = {
  config?: ThemeConfig;
  setMode?: (mode: string) => void;
};

declare global {
  interface Window {
    __theme?: ThemeRuntime;
    __themeToggleInit?: boolean;
    __initialThemeConfig?: ThemeConfig;
  }
}

const resolveMode = (mode: string | undefined, config: ThemeConfig): string => {
  const themes = config.themes ?? {};
  const fallback = config.defaultTheme ?? "light";
  return mode && mode in themes ? mode : fallback;
};

const applyMode = (mode: string, config: ThemeConfig) => {
  const themes = config.themes ?? {};
  const fallback = config.defaultTheme ?? "light";
  const resolved = resolveMode(mode, config);
  const html = document.documentElement;
  const themeName = themes[resolved] ?? themes[fallback];
  if (themeName) {
    html.dataset.theme = themeName;
  }
  html.dataset.themeMode = resolved;
  window.dispatchEvent(new CustomEvent("themechange", { detail: { mode: resolved } }));
};

const setupRuntime = (config: ThemeConfig) => {
  const storageKey = "theme:mode";

  const setMode = (mode: string) => {
    const resolved = resolveMode(mode, config);
    try {
      window.localStorage.setItem(storageKey, resolved);
    } catch (err) {
      console.warn("Impossible d'enregistrer le thème", err);
    }
    applyMode(resolved, config);
  };

  window.__theme = { config, setMode };

  const stored = (() => {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (err) {
      return null;
    }
  })();

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  const initialMode = resolveMode(stored || (prefersDark ? "dark" : config.defaultTheme), config);

  applyMode(initialMode, config);

  window.addEventListener("storage", (event) => {
    if (event.key === storageKey && event.newValue) {
      applyMode(event.newValue, config);
    }
  });
};

const bootstrap = () => {
  const config = window.__initialThemeConfig;
  if (!config) return;
  delete window.__initialThemeConfig;
  setupRuntime(config);
};

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
  } else {
    bootstrap();
  }
}

export {};
