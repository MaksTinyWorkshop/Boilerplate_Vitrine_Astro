import { initCallbackModal } from "./callbackModal.logic";

declare global {
  interface Document {
    __callbackModalInitialised?: boolean;
  }
}

const initialise = () => {
  if (document.__callbackModalInitialised) {
    return;
  }
  document.__callbackModalInitialised = true;
  initCallbackModal();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialise);
} else {
  initialise();
}
