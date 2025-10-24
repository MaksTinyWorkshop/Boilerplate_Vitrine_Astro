import { submitCallbackRequest } from "./callbackModal.submit";

const MODAL_ROOT_SELECTOR = "[data-callback-modal-root]";
const TRIGGER_SELECTOR = "[data-callback-trigger]";

let openModalHandler: (() => void) | null = null;
let closeModalHandler: (() => void) | null = null;
let keydownBound = false;

const focusFirstInput = (form: HTMLFormElement | null) => {
  const firstInput = form?.querySelector<HTMLElement>("input, textarea, select");
  firstInput?.focus({ preventScroll: true });
};

const setupModal = () => {
  const root = document.querySelector<HTMLElement>(MODAL_ROOT_SELECTOR);
  if (!root) {
    openModalHandler = null;
    closeModalHandler = null;
    return;
  }

  if (root.dataset.callbackModalInitialised === "true") {
    return;
  }

  const form = root.querySelector<HTMLFormElement>("[data-modal-form]");
  const successMessage = root.querySelector<HTMLElement>("[data-modal-success]");
  const errorMessage = root.querySelector<HTMLElement>("[data-modal-error]");
  const closeButtons = root.querySelectorAll<HTMLButtonElement>("[data-modal-close]");
  const submitButton = form?.querySelector<HTMLButtonElement>("[type='submit']");
  const burgerToggle = document.getElementById("burger") as HTMLInputElement | null;

  let lastActiveElement: HTMLElement | null = null;

  const openModal = () => {
    lastActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    if (burgerToggle?.checked) {
      burgerToggle.checked = false;
      burgerToggle.dispatchEvent(new Event("change", { bubbles: true }));
    }

    form?.removeAttribute("hidden");
    successMessage?.setAttribute("hidden", "");
    errorMessage?.setAttribute("hidden", "");

    root.setAttribute("data-open", "true");
    root.setAttribute("aria-hidden", "false");

    focusFirstInput(form ?? null);
  };

  const closeModal = () => {
    root.setAttribute("data-open", "false");
    root.setAttribute("aria-hidden", "true");

    const target = lastActiveElement;
    lastActiveElement = null;

    if (target) {
      target.focus({ preventScroll: true });
    } else {
      const triggers = document.querySelectorAll<HTMLElement>(TRIGGER_SELECTOR);
      triggers[0]?.focus({ preventScroll: true });
    }
  };

  openModalHandler = openModal;
  closeModalHandler = closeModal;

  root.addEventListener("click", (event) => {
    if (event.target === root) {
      closeModalHandler?.();
    }
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => closeModalHandler?.());
  });

  form?.addEventListener("submit", (event) => {
    if (!form) return;
    submitCallbackRequest(event, {
      form,
      submitButton: submitButton ?? null,
      successMessage: successMessage ?? null,
      errorMessage: errorMessage ?? null,
    });
  });

  root.dataset.callbackModalInitialised = "true";
};

const bindTriggers = () => {
  if (!openModalHandler) {
    return;
  }

  document.querySelectorAll<HTMLElement>(TRIGGER_SELECTOR).forEach((trigger) => {
    if (trigger.dataset.callbackTriggerBound === "true") {
      return;
    }

    trigger.dataset.callbackTriggerBound = "true";
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openModalHandler?.();
    });
  });
};

const attachEscapeListener = () => {
  if (keydownBound) return;
  keydownBound = true;
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const root = document.querySelector<HTMLElement>(MODAL_ROOT_SELECTOR);
      if (root?.getAttribute("data-open") === "true") {
        closeModalHandler?.();
      }
    }
  });
};

export const initCallbackModal = () => {
  setupModal();
  bindTriggers();
  attachEscapeListener();
};
