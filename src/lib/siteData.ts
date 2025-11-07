import type { IconProps } from "@components/Icons/icon";
import {
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  LOCALE_SHORT_LABELS,
  type Locale,
} from "@lib/i18n/locales";

export type NavItem = {
  label: string;
  href: string;
};

export type BrandLogo = {
  id: string;
  src: string;
  alt: string;
};

export type ContactItem = {
  id: string;
  type: "phone" | "mail" | "link" | "address";
  label: string;
  zipcode?: string;
  city?: string;
  href?: string;
  icon?: IconProps["type"];
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon?: IconProps["type"];
  ariaLabel?: string;
};

export type FieldConfig = {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "tel";
  required?: boolean;
  pattern?: string;
};

export type CallbackConfig = {
  triggerLabel: string;
  title: string;
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
  fields: {
    name: FieldConfig;
    phone: FieldConfig;
  };
};

export type SiteConfig = {
  language: Locale;
  brand: {
    name: string;
    tagline?: string;
    logos: BrandLogo[];
  };
  i18n: {
    locales: Array<{
      code: Locale;
      label: string;
      shortLabel: string;
    }>;
  };
  navigation: {
    main: NavItem[];
    footer: NavItem[];
  };
  contact: {
    items: ContactItem[];
    primaryAction?: {
      label: string;
      href: string;
      icon?: IconProps["type"];
    };
  };
  social: SocialLink[];
  legal: {
    companyName: string;
    links: NavItem[];
  };
  footer?: {
    signature?: string;
  };
  interactions: {
    callback: CallbackConfig;
  };
  seo?: {
    siteUrl?: string;
    defaultTitle?: string;
    titleTemplate?: string;
    defaultDescription?: string;
    defaultRobots?: string;
    defaultImage?: {
      src: string;
      alt?: string;
    };
    openGraphLocale?: string;
    applicationName?: string;
    twitter?: {
      site?: string;
      creator?: string;
    };
  };
};

type SiteConfigMap = Record<Locale, SiteConfig>;

const localeOptions = Object.entries(LOCALE_LABELS).map(([code, label]) => {
  const typedCode = code as Locale;
  return {
    code: typedCode,
    label,
    shortLabel: LOCALE_SHORT_LABELS[typedCode],
  };
});

const SITE_CONFIGS: SiteConfigMap = {
  fr: {
    language: "fr",
    brand: {
      name: "Votre entreprise",
      tagline: "Solution vitrine Astro prête à personnaliser",
      logos: [
        {
          id: "primary",
          src: "images/company-logo.svg",
          alt: "Logo principal",
        },
        {
          id: "secondary",
          src: "images/company-logo.svg",
          alt: "Logo secondaire",
        },
      ],
    },
    i18n: {
      locales: localeOptions,
    },
    navigation: {
      main: [
        { label: "Fonctionnement", href: "/fonctionnement" },
        { label: "Secteurs d'activités", href: "/secteurs" },
        { label: "Tarifs", href: "/tarifs" },
        { label: "Contact", href: "/contact" },
      ],
      footer: [
        { label: "Mentions légales", href: "/mentions-legales" },
        { label: "CGV", href: "/cgv" },
      ],
    },
    contact: {
      items: [
        {
          id: "phone",
          type: "phone",
          label: "01 23 45 67 89",
          href: "tel:+33123456789",
          icon: "phone",
        },
        {
          id: "mail",
          type: "mail",
          label: "contact@votre-entreprise.fr",
          href: "mailto:contact@votre-entreprise.fr",
          icon: "mail",
        },
      ],
      primaryAction: {
        label: "Nous contacter",
        href: "/contact",
        icon: "phone",
      },
    },
    social: [
      {
        id: "facebook",
        label: "Facebook",
        icon: "facebook",
        href: "https://www.facebook.com/votre-entreprise",
        ariaLabel: "Suivre l'entreprise sur Facebook",
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        icon: "linkedin",
        href: "https://www.linkedin.com/company/votre-entreprise",
        ariaLabel: "Découvrir l'entreprise sur LinkedIn",
      },
      {
        id: "github",
        label: "GitHub",
        icon: "github",
        href: "https://github.com/your-company",
        ariaLabel: "Accéder au GitHub de l'entreprise",
      },
    ],
    legal: {
      companyName: "Votre entreprise",
      links: [
        { label: "Mentions légales", href: "/mentions-legales" },
        { label: "Politique de confidentialité", href: "/confidentialite" },
      ],
    },
    footer: {
      signature: "Site vitrine propulsé par Astro.",
    },
    interactions: {
      callback: {
        triggerLabel: "Être rappelé",
        title: "Nous vous recontactons rapidement",
        submitLabel: "Être rappelé",
        successMessage: "Votre demande a bien été prise en compte.",
        errorMessage: "Une erreur est survenue. Merci de réessayer plus tard.",
        fields: {
          name: {
            id: "callback-name",
            label: "Nom",
            placeholder: "Votre nom",
            required: true,
          },
          phone: {
            id: "callback-phone",
            label: "Téléphone",
            placeholder: "Votre numéro de téléphone",
            required: true,
            type: "tel",
            pattern:
              "^(?:\\+?(?:[0-9]{1,3})[- .]?)?(?:0[1-9](?:[- .]?[0-9]{2}){4}|[1-9][0-9]{6,14})$",
          },
        },
      },
    },
    seo: {
      siteUrl: "https://www.domaine.com",
      defaultTitle: "Votre entreprise",
      titleTemplate: "%s | Votre entreprise",
      defaultDescription: "Solution vitrine Astro prête à personnaliser",
      defaultRobots: "index,follow",
      defaultImage: {
        src: "/images/hero-bg.svg",
        alt: "Illustration de Votre entreprise",
      },
      openGraphLocale: "fr_FR",
      applicationName: "Votre entreprise",
      twitter: {
        site: "@votreentreprise",
      },
    },
  },
  en: {
    language: "en",
    brand: {
      name: "Your Company",
      tagline: "Ready-to-customize Astro showcase website",
      logos: [
        {
          id: "primary",
          src: "images/company-logo.svg",
          alt: "Primary logo",
        },
        {
          id: "secondary",
          src: "images/company-logo.svg",
          alt: "Secondary logo",
        },
      ],
    },
    i18n: {
      locales: localeOptions,
    },
    navigation: {
      main: [
        { label: "How it works", href: "/how-it-works" },
        { label: "Industries", href: "/industries" },
        { label: "Pricing", href: "/pricing" },
        { label: "Contact", href: "/contact" },
      ],
      footer: [
        { label: "Legal notice", href: "/legal-notice" },
        { label: "Terms of service", href: "/terms" },
      ],
    },
    contact: {
      items: [
        {
          id: "phone",
          type: "phone",
          label: "+33 1 23 45 67 89",
          href: "tel:+33123456789",
          icon: "phone",
        },
        {
          id: "mail",
          type: "mail",
          label: "contact@your-company.com",
          href: "mailto:contact@your-company.com",
          icon: "mail",
        },
      ],
      primaryAction: {
        label: "Contact us",
        href: "/contact",
        icon: "phone",
      },
    },
    social: [
      {
        id: "facebook",
        label: "Facebook",
        icon: "facebook",
        href: "https://www.facebook.com/your-company",
        ariaLabel: "Follow the company on Facebook",
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        icon: "linkedin",
        href: "https://www.linkedin.com/company/your-company",
        ariaLabel: "Discover the company on LinkedIn",
      },
      {
        id: "github",
        label: "GitHub",
        icon: "github",
        href: "https://github.com/your-company",
        ariaLabel: "View the company's GitHub",
      },
    ],
    legal: {
      companyName: "Your Company",
      links: [
        { label: "Legal notice", href: "/legal-notice" },
        { label: "Privacy policy", href: "/privacy-policy" },
      ],
    },
    footer: {
      signature: "Showcase site powered by Astro.",
    },
    interactions: {
      callback: {
        triggerLabel: "Request a call",
        title: "We call you back quickly",
        submitLabel: "Request a call",
        successMessage: "Your request has been received.",
        errorMessage: "An error occurred. Please try again later.",
        fields: {
          name: {
            id: "callback-name",
            label: "Name",
            placeholder: "Your name",
            required: true,
          },
          phone: {
            id: "callback-phone",
            label: "Phone",
            placeholder: "Your phone number",
            required: true,
            type: "tel",
            pattern:
              "^(?:\\+?(?:[0-9]{1,3})[- .]?)?(?:0[1-9](?:[- .]?[0-9]{2}){4}|[1-9][0-9]{6,14})$",
          },
        },
      },
    },
    seo: {
      siteUrl: "https://www.domaine.com",
      defaultTitle: "Your Company",
      titleTemplate: "%s | Your Company",
      defaultDescription: "Ready-to-customize Astro showcase website.",
      defaultRobots: "index,follow",
      defaultImage: {
        src: "/images/hero-bg.svg",
        alt: "Illustration for Your Company",
      },
      openGraphLocale: "en_US",
      applicationName: "Your Company",
      twitter: {
        site: "@yourcompany",
      },
    },
  },
};

export const getSiteConfig = (locale: Locale = DEFAULT_LOCALE): SiteConfig =>
  SITE_CONFIGS[locale] ?? SITE_CONFIGS[DEFAULT_LOCALE];

export const siteConfig = getSiteConfig(DEFAULT_LOCALE);

export const getAvailableLocales = () => localeOptions;

export const getCompanyDetails = (locale: Locale = DEFAULT_LOCALE) => {
  const site = getSiteConfig(locale);

  return {
    name: site.brand.name,
    contactItems: site.contact.items.map((item) => ({
      type: item.type === "link" ? "mail" : item.type,
      icon: item.icon,
      href: item.href,
      label: item.label,
    })),
    socialLinks: site.social.map(({ label, ...rest }) => ({
      name: label,
      ...rest,
    })),
    logos: site.brand.logos.map((logo) => ({
      name: logo.id,
      source: {
        src: logo.src,
        alt: logo.alt,
      },
    })),
  };
};
