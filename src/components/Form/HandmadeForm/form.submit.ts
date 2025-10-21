import { collectContactData, syncNumberField } from "./form.logic";

const API_SUBMIT_URL = "/api/submit";

/**
 * Nettoie et prépare les valeurs avant envoi
 */
function formatPhone(phone: string): string {
  if (!phone) return "";
  let clean = phone.replace(/\s+/g, "").trim();

  // Si commence par 0 → on remplace par +33
  if (clean.startsWith("0")) clean = "+33" + clean.slice(1);

  // Si l'utilisateur a mis déjà +33, on laisse
  if (clean.startsWith("+33")) return clean;

  return clean;
}

/**
 * Soumission principale du formulaire
 */
const FORM_SUCCESS_SELECTOR = "[data-form-success]";
const FORM_ERROR_SELECTOR = "[data-form-error]";
const NUMBER_FIELD_SELECTOR = "[data-number-field]";

const toggleVisibility = (element: Element | null | undefined, visible: boolean) => {
  if (!element) return;
  if (visible) {
    element.removeAttribute("hidden");
  } else {
    element.setAttribute("hidden", "");
  }
};

const resetNumberFields = (form: HTMLFormElement) => {
  const containers = form.querySelectorAll<HTMLElement>(NUMBER_FIELD_SELECTOR);
  containers.forEach((container) => {
    syncNumberField(container, null);
  });
};

export async function submitToGoogleForm(form: HTMLFormElement) {
  const payload = collectContactData(form);

  const successMessage = form.querySelector<HTMLElement>(FORM_SUCCESS_SELECTOR);
  const errorMessage = form.querySelector<HTMLElement>(FORM_ERROR_SELECTOR);
  const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"], [type="submit"]');

  toggleVisibility(successMessage, false);
  toggleVisibility(errorMessage, false);

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.dataset.loading = "true";
  }

  const endpoint =
    payload.submission?.endpoint && payload.submission.endpoint.length > 0
      ? payload.submission.endpoint
      : API_SUBMIT_URL;

  const data: Record<string, string> = {};

  const assignField = (key: string | undefined, value: string | undefined) => {
    if (!key) return;
    data[key] = value ?? "";
  };

  if (payload.formula.include) {
    const formulaEntry =
      payload.formula.entryName && payload.formula.entryName.trim().length > 0
        ? payload.formula.entryName
        : payload.formula.label
          ? "Formule"
          : undefined;
    const formulaValue =
      payload.formula.value && payload.formula.value.trim().length > 0
        ? payload.formula.value.trim()
        : payload.formula.label && payload.formula.label.trim().length > 0
          ? payload.formula.label.trim()
          : payload.formula.id && payload.formula.id.trim().length > 0
            ? payload.formula.id.trim()
            : undefined;

    assignField(formulaEntry, formulaValue);
  }

  payload.fields.forEach((field) => {
    const key = field.submissionName ?? field.label ?? field.name;
    const rawValue = field.submissionValue ?? field.value ?? "";
    const value = field.type === "tel" ? formatPhone(rawValue) : rawValue;
    assignField(key, value);
  });

  if (payload.submission?.sheet) {
    const hasSheetOverride = Object.prototype.hasOwnProperty.call(
      data,
      "sheet"
    );
    if (!hasSheetOverride) assignField("sheet", payload.submission.sheet);
  }

  const secretKey = import.meta.env.PUBLIC_GOOGLE_SECRET_KEY;
  if (secretKey && !Object.prototype.hasOwnProperty.call(data, "secret")) {
    assignField("secret", secretKey);
  }

  if (payload.submission?.staticFields) {
    payload.submission.staticFields.forEach(({ name, value }) => {
      assignField(name, value);
    });
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const text = await response.text();
    if (!response.ok) {
      throw new Error(text || `Réponse ${response.status}`);
    }

    form.reset();
    resetNumberFields(form);
    toggleVisibility(errorMessage, false);
    toggleVisibility(successMessage, true);

    console.log(`✅ Réponse du serveur ${endpoint}:`, text);
  } catch (err) {
    console.error("❌ Erreur lors de l’envoi vers /api/submit:", err);
    toggleVisibility(successMessage, false);
    toggleVisibility(errorMessage, true);
    return;
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      delete submitButton.dataset.loading;
    }
  }
}
