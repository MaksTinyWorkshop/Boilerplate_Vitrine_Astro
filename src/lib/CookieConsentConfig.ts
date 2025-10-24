import type { CookieConsentConfig } from "vanilla-cookieconsent";

export const config: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: "box inline",
      position: "bottom left",
    },
    preferencesModal: {
      layout: "box",
      position: "right",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    functionality: {},
    analytics: {
      services: {
        ga4: {
          label: "Google Analytics 4",
          onAccept: () => {
            import("./analytics/ga").then((module) => module.loadGA());
          },
          onReject: () => {
            import("./analytics/ga").then((module) => module.disableGA());
          },
          cookies: [
            {
              name: /^_ga/,
            },
          ],
        },
      },
    },
  },
  language: {
    default: "fr",
    autoDetect: "browser",
    translations: {
      en: {
        consentModal: {
          title: "Hello traveller, it's cookie time!",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Manage preferences",
          footer:
            '<a href="/confidentialite">Privacy Policy</a>\n<a href="/mentions-legales">Terms and conditions</a>',
        },
        preferencesModal: {
          title: "Consent Preferences Center",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close modal",
          serviceCounterLabel: "Service|Services",
          sections: [
            {
              title: "Cookie Usage",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            },
            {
              title:
                'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              linkedCategory: "necessary",
            },
            {
              title: "Functionality Cookies",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              linkedCategory: "functionality",
            },
            {
              title: "Analytics Cookies",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              linkedCategory: "analytics",
            },
            {
              title: "More information",
              description:
                'For any query in relation to my policy on cookies and your choices, please <a class="cc__link" href="#yourdomain.com">contact me</a>.',
            },
          ],
        },
      },
      fr: {
        consentModal: {
          title: "Bienvenue, c'est l'heure des cookies !",
          description:
            "Nous utilisons des cookies pour améliorer votre expérience, mesurer l'audience et proposer du contenu pertinent. Vous pouvez accepter tous les cookies ou gérer vos préférences.",
          acceptAllBtn: "Tout accepter",
          acceptNecessaryBtn: "Tout refuser",
          showPreferencesBtn: "Personnaliser",
          footer:
            '<a href="/confidentialite">Politique de confidentialité</a>\n<a href="/mentions-legales">Mentions légales</a>',
        },
        preferencesModal: {
          title: "Centre de préférences",
          acceptAllBtn: "Tout accepter",
          acceptNecessaryBtn: "Tout refuser",
          savePreferencesBtn: "Enregistrer",
          closeIconLabel: "Fermer la modale",
          serviceCounterLabel: "Service|Services",
          sections: [
            {
              title: "Utilisation des cookies",
              description:
                "Nous utilisons différents types de cookies pour assurer le bon fonctionnement du site, comprendre son utilisation et personnaliser votre expérience.",
            },
            {
              title:
                'Cookies strictement nécessaires <span class="pm__badge">Toujours actifs</span>',
              description:
                "Ces cookies sont indispensables au fonctionnement du site et ne peuvent pas être désactivés dans nos systèmes.",
              linkedCategory: "necessary",
            },
            {
              title: "Cookies fonctionnels",
              description:
                "Ils nous permettent d'améliorer les fonctionnalités et la personnalisation. Si vous les refusez, certaines fonctionnalités pourraient ne pas fonctionner.",
              linkedCategory: "functionality",
            },
            {
              title: "Cookies d'analyse",
              description:
                "Ces cookies nous aident à mesurer la fréquentation du site et à comprendre comment nos visiteurs interagissent avec nos contenus.",
              linkedCategory: "analytics",
            },
            {
              title: "Plus d'informations",
              description:
                'Pour toute question sur notre politique en matière de cookies et vos droits, veuillez <a class="cc__link" href="#lien-contact">nous contacter</a>.',
            },
          ],
        },
      },
    },
  },
};
