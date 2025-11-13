const navbar = document.querySelector<HTMLElement>("[data-navbar]");
if (!navbar) throw new Error("Navbar not found");

const themePreferenceAttr = "data-theme-preference" as const;
const themeAttr = "data-theme" as const;
const themeAttributes: Array<typeof themeAttr | typeof themePreferenceAttr> = [
  themeAttr,
  themePreferenceAttr,
];

const getActiveTheme = (): "light" | "dark" => {
  const preferred = document.documentElement.getAttribute(themePreferenceAttr);
  const current = document.documentElement.getAttribute(themeAttr);
  return (preferred ?? current ?? "light") === "dark" ? "dark" : "light";
};

const syncLogoVariants = (forcedTheme?: string) => {
  const theme = forcedTheme === "dark" ? "dark" : forcedTheme === "light" ? "light" : getActiveTheme();

  navbar
    .querySelectorAll<HTMLImageElement>("[data-logo-variant]")
    .forEach((img) => {
      const variant = img.dataset.logoVariant ?? "light";
      const wrapper = img.closest<HTMLElement>("[data-has-dark]");
      const hasDarkVariant = wrapper?.dataset.hasDark === "true";

      if (!hasDarkVariant) {
        img.hidden = variant !== "light";
        return;
      }

      img.hidden = theme === "dark" ? variant !== "dark" : variant !== "light";
    });
};

const setNavbarHeight = () => {
  const totalHeight = navbar.offsetHeight;
  document.documentElement.style.setProperty(
    "--navbar-total-height",
    `${totalHeight}px`
  );
};

setNavbarHeight();
syncLogoVariants();

const resizeObserver = new ResizeObserver(() => setNavbarHeight());
resizeObserver.observe(navbar);
window.addEventListener("resize", setNavbarHeight);

const themeObserver = new MutationObserver(() => syncLogoVariants());
themeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: themeAttributes,
});

const handleSetTheme = ((event: Event) => {
  const customEvent = event as CustomEvent<string | undefined>;
  syncLogoVariants(customEvent.detail);
}) as EventListener;

document.addEventListener("set-theme", handleSetTheme);

const cleanup = () => {
  resizeObserver.disconnect();
  themeObserver.disconnect();
  window.removeEventListener("resize", setNavbarHeight);
  document.removeEventListener("set-theme", handleSetTheme);
};

addEventListener("astro:before-soft-navigate", cleanup, { once: true });
addEventListener("pagehide", cleanup, { once: true });
