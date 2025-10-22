// src/components/Form/HandmadeForm/form.logic.ts
const SELECT_SELECTOR = "[data-contact-select]";
const FORM_SELECTOR = "[data-formula-fields]";
const NUMBER_FIELD_SELECTOR = "[data-number-field]";
const FORM_ACTIVE_CLASS = "is-active";

const toFiniteOrNull = (value: string | number | null | undefined) => {
  if (value === undefined || value === null || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const clampNumeric = (value: number, min: number, max: number | null) => {
  const upper = typeof max === "number" ? max : Number.POSITIVE_INFINITY;
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), upper);
};

export const syncNumberField = (
  container: HTMLElement,
  rawValue: string | number | null | undefined
) => {
  const input = container.querySelector<HTMLInputElement>(
    'input[type="number"]'
  );
  if (!input) return null;

  const min = toFiniteOrNull(container.dataset.min ?? input.min) ?? 0;
  const max = toFiniteOrNull(container.dataset.max ?? input.max);
  const step = toFiniteOrNull(container.dataset.step ?? input.step) ?? 1;

  const parsed = Number.parseFloat(String(rawValue ?? input.value ?? ""));
  let nextValue: number | null = Number.isFinite(parsed)
    ? clampNumeric(parsed, min, max)
    : null;

  input.value = nextValue === null ? "" : String(nextValue);
  container.dataset.value = input.value;

  container.querySelector<HTMLButtonElement>(
    "[data-stepper-decrement]"
  )!.disabled = nextValue === null ? true : nextValue <= min;

  const increment = container.querySelector<HTMLButtonElement>(
    "[data-stepper-increment]"
  );
  if (increment)
    increment.disabled =
      max !== null && nextValue !== null ? nextValue >= max : false;

  return { input, min, max, step, value: nextValue };
};

export const initialiseNumberField = (container: HTMLElement) => {
  if (container.dataset.numberFieldInitialised === "true") return;
  const input = container.querySelector<HTMLInputElement>(
    'input[type="number"]'
  );
  if (!input) return;
  syncNumberField(container, input.value);
  container
    .querySelector("[data-stepper-decrement]")
    ?.addEventListener("click", () =>
      syncNumberField(container, Number(input.value) - 1)
    );
  container
    .querySelector("[data-stepper-increment]")
    ?.addEventListener("click", () =>
      syncNumberField(container, Number(input.value) + 1)
    );
  container.dataset.numberFieldInitialised = "true";
};

/* =============================================================
NOUVELLE PARTIE : Initialisation “intelligente” du formulaire
============================================================== */

const normalise = (value: string | null | undefined) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

const parseCountParam = (params: URLSearchParams, ...names: string[]) => {
  for (const name of names) {
    const raw = params.get(name);
    if (!raw) continue;
    const parsed = Number.parseInt(raw, 10);
    if (Number.isFinite(parsed) && parsed >= 0) return String(parsed);
  }
  return null;
};

const activateFormula = (
  forms: HTMLFormElement[],
  select: HTMLSelectElement | null,
  requestedId: string | null
) => {
  const normalisedRequested = normalise(requestedId);
  const targetForm =
    forms.find((f) => normalise(f.dataset.formula) === normalisedRequested) ??
    forms[0] ??
    null;

  if (!targetForm) return;

  forms.forEach((f) => {
    const isTarget = f === targetForm;
    f.classList.toggle(FORM_ACTIVE_CLASS, isTarget);
    f.toggleAttribute("hidden", !isTarget);
  });

  if (select && targetForm.dataset.formula)
    select.value = targetForm.dataset.formula;
};

export const initContactForm = (section: HTMLElement) => {
  const select = section.querySelector<HTMLSelectElement>(SELECT_SELECTOR);
  const forms = Array.from(
    section.querySelectorAll<HTMLFormElement>(FORM_SELECTOR)
  );
  const numberFields = Array.from(
    section.querySelectorAll<HTMLElement>(NUMBER_FIELD_SELECTOR)
  );

  if (forms.length === 0) return;

  numberFields.forEach(initialiseNumberField);

  // Lire les paramètres d’URL
  const urlParams = new URLSearchParams(window.location.search);
  const requestedFormula = urlParams.get("formula") ?? urlParams.get("plan");
  const visualsValue = parseCountParam(urlParams, "visuals", "visuels");
  const videosValue = parseCountParam(urlParams, "videos", "video", "vidéos");

  // 🧩 Appliquer les valeurs trouvées
  if (visualsValue) {
    forms.forEach((form) => {
      const input = form.querySelector<HTMLInputElement>(
        'input[name="visuals"]'
      );
      if (input) {
        input.value = visualsValue;
        const container = input.closest<HTMLElement>(NUMBER_FIELD_SELECTOR);
        if (container) syncNumberField(container, visualsValue);
      }
    });
  }

  if (videosValue) {
    forms.forEach((form) => {
      const input = form.querySelector<HTMLInputElement>(
        'input[name="videos"]'
      );
      if (input) {
        input.value = videosValue;
        const container = input.closest<HTMLElement>(NUMBER_FIELD_SELECTOR);
        if (container) syncNumberField(container, videosValue);
      }
    });
  }

  // 🧩 Sélection automatique de la formule (depuis l’URL)
  activateFormula(forms, select, requestedFormula);

  // 🧩 Écoute le changement de formule manuellement
  if (select) {
    select.addEventListener("change", (e) => {
      const value = (e.target as HTMLSelectElement).value;
      activateFormula(forms, select, value);
    });
  }
};

/* ==========================================================
Collecte des données pour l’envoi
============================================================ */
type SubmissionConfig = {
  endpoint?: string;
  sheet?: string;
  staticFields?: { name: string; value: string }[];
};

type CollectedField = {
  id: string;
  name: string;
  label: string;
  value: string;
  submissionName?: string;
  submissionValue?: string;
  type?: string;
  required: boolean;
};

const parseSubmissionConfig = (raw: string | undefined): SubmissionConfig | undefined => {
  if (!raw) return undefined;

  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      const staticFields = Array.isArray(parsed.staticFields)
        ? parsed.staticFields.filter((entry: unknown): entry is { name: string; value: string } => {
            if (!entry || typeof entry !== "object") {
              return false;
            }
            const { name, value } = entry as {
              name?: unknown;
              value?: unknown;
            };
            return (
              typeof name === "string" &&
              name.trim().length > 0 &&
              typeof value === "string" &&
              value.trim().length > 0
            );
          })
        : undefined;
      return {
        endpoint:
          typeof parsed.endpoint === "string" && parsed.endpoint.trim().length > 0
            ? parsed.endpoint.trim()
            : undefined,
        sheet:
          typeof parsed.sheet === "string" && parsed.sheet.trim().length > 0
            ? parsed.sheet.trim()
            : undefined,
        ...(staticFields && staticFields.length > 0 ? { staticFields } : {}),
      };
    }
  } catch (error) {
    console.warn("Impossible de parser la configuration de soumission du formulaire.", error);
  }

  return undefined;
};

const resolveFieldSubmissionValue = (
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  fallbackValue: string,
) => {
  const directValue =
    typeof element.dataset.submissionValue === "string" &&
    element.dataset.submissionValue.trim().length > 0
      ? element.dataset.submissionValue.trim()
      : undefined;

  if (directValue) return directValue;

  if (element instanceof HTMLSelectElement) {
    const option = element.selectedOptions[0];
    if (option) {
      const optionValue =
        (typeof option.dataset.submissionValue === "string" &&
          option.dataset.submissionValue.trim().length > 0 &&
          option.dataset.submissionValue.trim()) ||
        option.textContent?.trim();
      if (optionValue) return optionValue;
    }
  }

  return fallbackValue;
};

const collectFieldData = (
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  formData: FormData,
): CollectedField | null => {
  const name = element.name;
  if (!name) return null;

  const rawValue = formData.get(name);
  const stringValue =
    typeof rawValue === "string"
      ? rawValue.trim()
      : rawValue instanceof File
        ? ""
        : rawValue !== null
          ? String(rawValue).trim()
          : "";

  const label =
    element.dataset.fieldLabel ??
    element.getAttribute("aria-label") ??
    element.getAttribute("placeholder") ??
    name;

  const submissionName =
    typeof element.dataset.submissionName === "string" &&
    element.dataset.submissionName.trim().length > 0
      ? element.dataset.submissionName.trim()
      : undefined;

  const submissionValue = resolveFieldSubmissionValue(element, stringValue);

  const type =
    element.dataset.fieldType ??
    (element instanceof HTMLInputElement
      ? element.type
      : element instanceof HTMLTextAreaElement
        ? "textarea"
        : "select");

  return {
    id: element.id || name,
    name,
    label,
    value: stringValue,
    submissionName,
    submissionValue,
    type,
    required: Boolean(element.required),
  };
};

export const collectContactData = (form: HTMLFormElement) => {
  const formData = new FormData(form);
  const elements = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      "input[name], textarea[name], select[name]",
    ),
  );

  const seenNames = new Set<string>();
  const fields = elements
    .map((element) => {
      if (seenNames.has(element.name)) return null;
      seenNames.add(element.name);
      return collectFieldData(element, formData);
    })
    .filter((field): field is CollectedField => Boolean(field));

  const submission = parseSubmissionConfig(form.dataset.submissionConfig);

  return {
    formula: {
      id: form.dataset.formula ?? "",
      label: form.dataset.formulaLabel ?? "",
      entryName: form.dataset.formulaEntry ?? "",
      value: form.dataset.formulaValue ?? "",
      include: form.dataset.includeFormula === "true",
    },
    fields,
    submission,
  };
};
