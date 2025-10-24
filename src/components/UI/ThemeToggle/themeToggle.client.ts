export {}

declare global {
  interface Window {
    __themeToggleInit?: boolean
    __themeToggleObserver?: MutationObserver
  }
}

const CHECKBOX_SELECTOR = "[data-theme-toggle-checkbox]" as const
const THEME_ATTR = "data-theme" as const
const PREF_ATTR = "data-theme-preference" as const

const getCurrentTheme = (): string =>
  document.documentElement.getAttribute(PREF_ATTR) ||
  document.documentElement.getAttribute(THEME_ATTR) ||
  "light"

const getCheckboxThemes = (checkbox: HTMLInputElement) => ({
  light: checkbox.dataset.lightTheme ?? "light",
  dark: checkbox.dataset.darkTheme ?? "dark",
})

const updateCheckboxes = (mode: string) => {
  document
    .querySelectorAll<HTMLInputElement>(CHECKBOX_SELECTOR)
    .forEach((checkbox) => {
      const { dark } = getCheckboxThemes(checkbox)
      checkbox.checked = mode === dark
    })
}

const handleCheckboxChange = (event: Event) => {
  const checkbox = event.currentTarget as HTMLInputElement
  const { light, dark } = getCheckboxThemes(checkbox)
  const targetTheme = checkbox.checked ? dark : light
  document.dispatchEvent(new CustomEvent("set-theme", { detail: targetTheme }))
}

const attachListeners = () => {
  const checkboxes = document.querySelectorAll<HTMLInputElement>(CHECKBOX_SELECTOR)

  checkboxes.forEach((checkbox) => {
    if (checkbox.dataset.themeToggleReady === "true") return
    checkbox.dataset.themeToggleReady = "true"
    checkbox.addEventListener("change", handleCheckboxChange)
  })

  updateCheckboxes(getCurrentTheme())
}

const startObserver = () => {
  if (window.__themeToggleObserver) return

  window.__themeToggleObserver = new MutationObserver(() => {
    updateCheckboxes(getCurrentTheme())
  })

  window.__themeToggleObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [THEME_ATTR, PREF_ATTR],
  })
}

if (!window.__themeToggleInit) {
  window.__themeToggleInit = true
  document.addEventListener("astro:after-swap", () => {
    attachListeners()
    startObserver()
  })
}

attachListeners()
startObserver()
