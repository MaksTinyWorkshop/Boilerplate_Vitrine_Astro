import type { CallbackPayload } from "@app-types/contact";

const CALLBACK_ENDPOINT = import.meta.env.PUBLIC_CALLBACK_ENDPOINT;

interface SubmissionElements {
  form: HTMLFormElement;
  submitButton?: HTMLButtonElement | null;
  successMessage?: HTMLElement | null;
  errorMessage?: HTMLElement | null;
}

const toggleVisibility = (element: HTMLElement | null | undefined, visible: boolean) => {
  if (!element) return;
  if (visible) {
    element.removeAttribute("hidden");
  } else {
    element.setAttribute("hidden", "");
  }
};

const toggleLoading = (button: HTMLButtonElement | null | undefined, loading: boolean) => {
  if (!button) return;
  button.disabled = loading;
  if (loading) {
    button.dataset.loading = "true";
  } else {
    delete button.dataset.loading;
  }
};

export const submitCallbackRequest = async (
  event: SubmitEvent,
  { form, submitButton, successMessage, errorMessage }: SubmissionElements,
) => {
  event.preventDefault();

  toggleVisibility(successMessage ?? null, false);
  toggleVisibility(errorMessage ?? null, false);
  toggleLoading(submitButton ?? null, true);

  const formData = new FormData(form);
  const payload: CallbackPayload = {
    name: (formData.get("name") ?? "").toString().trim(),
    phone: (formData.get("phone") ?? "").toString().trim(),
  };

  if (!CALLBACK_ENDPOINT) {
    console.error("PUBLIC_CALLBACK_ENDPOINT is not set; cannot submit callback form.");
    toggleVisibility(errorMessage ?? null, true);
    toggleLoading(submitButton ?? null, false);
    return;
  }

  try {
    const endpointUrl = new URL(CALLBACK_ENDPOINT, window.location.href);
    const isCrossOrigin = endpointUrl.origin !== window.location.origin;

    const requestInit: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    if (isCrossOrigin) {
      requestInit.mode = "cors";
      requestInit.credentials = "omit";
    }

    const response = await fetch(CALLBACK_ENDPOINT, requestInit);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    form.reset();
    form.setAttribute("hidden", "");
    toggleVisibility(successMessage ?? null, true);
  } catch (error) {
    console.error("callback request failed", error);
    toggleVisibility(errorMessage ?? null, true);
  } finally {
    toggleLoading(submitButton ?? null, false);
  }
};
