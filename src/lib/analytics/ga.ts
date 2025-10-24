const GA_MEASUREMENT_ID = import.meta.env.PUBLIC_GA_MEASUREMENT_ID;
const REMOTE_SCRIPT_MARKER = "ga4-loader";

type DataLayerEntry = Record<string, unknown> | unknown[];

type GAWindow = Window & {
  dataLayer?: DataLayerEntry[];
  [key: `ga-disable-${string}`]: boolean;
};

const gaWindow = (): GAWindow => window as unknown as GAWindow;

const createScript = (attrs: Record<string, string>, content?: string) => {
  const script = document.createElement("script");
  script.type = "text/partytown";
  Object.entries(attrs).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });
  if (content) {
    script.textContent = content;
  }
  document.head.appendChild(script);
  return script;
};

const hasInjectedScripts = () =>
  document.head.querySelector(`[data-ga-loader="${REMOTE_SCRIPT_MARKER}"]`) !== null;

export const loadGA = () => {
  if (typeof window === "undefined") return;
  if (!GA_MEASUREMENT_ID) {
    console.warn(
      "[analytics] PUBLIC_GA_MEASUREMENT_ID is not defined. Google Analytics will not be loaded.",
    );
    return;
  }

  const win = gaWindow();

  if (hasInjectedScripts()) {
    win[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
    return;
  }

  win.dataLayer = win.dataLayer || [];
  win[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

  createScript(
    {
      src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
      "data-ga-loader": REMOTE_SCRIPT_MARKER,
    },
  );

  createScript(
    { "data-ga-loader": `${REMOTE_SCRIPT_MARKER}-inline` },
    `window.dataLayer = window.dataLayer || [];
     function gtag(){window.dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', '${GA_MEASUREMENT_ID}', {
       anonymize_ip: true,
       send_page_view: true
     });`,
  );
};

export const disableGA = () => {
  if (typeof window === "undefined") return;
  if (!GA_MEASUREMENT_ID) return;
  gaWindow()[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
};
