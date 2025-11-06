const CALLBACK_ENDPOINT = import.meta.env.PUBLIC_CTA_CALLBACK_ENDPOINT;

interface SubmissionElements {
  form: HTMLFormElement;
  submitButton?: HTMLButtonElement | null;
}

const toggleLoading = (
  button: HTMLButtonElement | null | undefined,
  loading: boolean
) => {
  if (!button) return;
  button.disabled = loading;
  button.dataset.loading = loading ? "true" : "false";
};

export const submitCallbackRequest = async (
  event: SubmitEvent,
  { form, submitButton }: SubmissionElements
) => {
  event.preventDefault();

  toggleLoading(submitButton, true);

  const formData = new FormData(form);
  const payload = {
    phone: (formData.get("phone") ?? "").toString().trim(),
  };

  if (!CALLBACK_ENDPOINT) {
    console.error(
      "PUBLIC_CALLBACK_ENDPOINT is not set; cannot submit callback form."
    );
    toggleLoading(submitButton ?? null, false);
    return;
  }

  try {
    const response = await fetch(CALLBACK_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(await response.text());
    form.reset();
    alert("Merci ! Nous vous rappellerons très bientôt.");
  } catch (error) {
    console.error("callback request failed", error);
    alert("Une erreur est survenue. Merci de réessayer.");
  } finally {
    toggleLoading(submitButton, false);
  }
};
