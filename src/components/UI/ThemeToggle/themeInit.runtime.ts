export {};

const initializeRuntime = (config: {
  defaultTheme?: string;
  themes?: Record<string, string>;
}) => {
  if (typeof window === "undefined") return;

  const storageKey = "theme:mode";
  const themes = config.themes ?? {};
  const fallback = config.defaultTheme ?? "light";

  const resolveMode = (mode?: string): string =>
    mode && mode in themes ? mode : fallback;

  const applyMode = (mode: string) => {
    const resolved = resolveMode(mode);
    const html = document.documentElement;
    const themeName = themes[resolved] ?? themes[fallback];
    if (themeName) {
      html.dataset.theme = themeName;
    }
    html.dataset.themeMode = resolved;
    window.dispatchEvent(new CustomEvent("themechange", { detail: { mode: resolved } }));
  };

  const setMode = (mode: string) => {
    const resolved = resolveMode(mode);
    try {
      window.localStorage.setItem(storageKey, resolved);
    } catch (err) {
      console.warn("Impossible d'enregistrer le thème", err);
    }
    applyMode(resolved);
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
  const initialMode = resolveMode(stored || (prefersDark ? "dark" : fallback));

  applyMode(initialMode);

  window.addEventListener("storage", (event) => {
    if (event.key === storageKey && event.newValue) {
      applyMode(event.newValue);
    }
  });
};

const bootstrap = () => {
  const config = window.__initialThemeConfig;
  if (!config) return;
  delete window.__initialThemeConfig;
  initializeRuntime(config);
};

declare global {
  interface Window {
    __theme?: {
      config?: {
        defaultTheme?: string;
        themes?: Record<string, string>;
      };
      setMode?: (mode: string) => void;
    };
    __themeToggleInit?: boolean;
    __initialThemeConfig?: {
      defaultTheme?: string;
      themes?: Record<string, string>;
    };
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
} else {
  bootstrap();
}
