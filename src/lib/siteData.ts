import type { IconProps } from "@components/Icons/icon";

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
  type: "phone" | "mail" | "link";
  label: string;
  href: string;
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
  language: string;
  brand: {
    name: string;
    tagline?: string;
    logos: BrandLogo[];
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
  interactions: {
    callback: CallbackConfig;
  };
  ui: {
    theme: string;
  };
};

export const siteConfig: SiteConfig = {
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
  ui: {
    theme: "mindleaf",
  },
};

export const mainNavigation = siteConfig.navigation.main;

export const companyDetails = {
  name: siteConfig.brand.name,
  contactItems: siteConfig.contact.items.map((item) => ({
    type: item.type === "link" ? "mail" : item.type,
    icon: item.icon,
    href: item.href,
    label: item.label,
  })),
  socialLinks: siteConfig.social.map(({ label, ...rest }) => ({
    name: label,
    ...rest,
  })),
  logos: siteConfig.brand.logos.map((logo) => ({
    name: logo.id,
    source: {
      src: logo.src,
      alt: logo.alt,
    },
  })),
};
