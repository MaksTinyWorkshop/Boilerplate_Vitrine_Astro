import { submitCallbackRequest } from "./ctaCallbackForm.submit";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(
    "[data-cta-callback]"
  ) as HTMLFormElement | null;
  if (!form) return;

  const submitButton = form.querySelector(
    "button[type=submit]"
  ) as HTMLButtonElement | null;

  form.addEventListener("submit", (event) => {
    submitCallbackRequest(event, { form, submitButton });
  });
});
