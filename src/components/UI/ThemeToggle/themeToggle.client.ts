export {};

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
  }
}

const getRuntime = () => window.__theme;

const getModes = (): string[] => {
  const themes = getRuntime()?.config?.themes;
  const keys = themes ? Object.keys(themes) : [];
  return keys.length > 0 ? keys : ["light", "dark"];
};

const getCurrentMode = (): string => {
  return (
    document.documentElement.dataset.themeMode ||
    getRuntime()?.config?.defaultTheme ||
    "light"
  );
};

const getNextMode = (mode: string): string => {
  const modes = getModes();
  const index = modes.indexOf(mode);
  if (index === -1) {
    return modes[0] || "light";
  }
  return modes[(index + 1) % modes.length] || modes[0] || "light";
};

const updateButtons = (mode: string) => {
  const buttons = document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]");
  buttons.forEach((button) => {
    button.dataset.themeMode = mode;
    button.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
  });
};

const attachListeners = () => {
  const buttons = document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]");
  buttons.forEach((button) => {
    if (button.dataset.themeToggleReady === "true") return;
    button.dataset.themeToggleReady = "true";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const next = getNextMode(getCurrentMode());
      getRuntime()?.setMode?.(next);
      updateButtons(next);
    });
  });
  updateButtons(getCurrentMode());
};

if (!window.__themeToggleInit) {
  window.__themeToggleInit = true;
  window.addEventListener("themechange", (event) => {
    const detail = (event as CustomEvent<{ mode?: string }>).detail;
    if (detail?.mode) {
      updateButtons(detail.mode);
    }
  });
  document.addEventListener("astro:after-swap", attachListeners);
}

attachListeners();
