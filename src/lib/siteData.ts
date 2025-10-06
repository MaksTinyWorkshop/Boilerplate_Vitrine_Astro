import type { IconProps } from "@components/Icons/icon";

export type NavItem = {
  name: string;
  path: string;
};

export const mainNavigation: NavItem[] = [
  { name: "Fonctionnement", path: "/fonctionnement" },
  { name: "Secteurs d'activités", path: "/secteurs" },
  { name: "Tarifs", path: "/tarifs" },
  { name: "Contact", path: "/contact" },
];

export type LogoAsset = {
  name: string;
  source: {
    src: string;
    alt: string;
  }
};

export type ContactItem = {
  type: "phone" | "mail";
  icon: IconProps["type"];
  href: string;
  label: string;
};

export type SocialLink = {
  name: string;
  icon?: IconProps["type"];
  href: string;
  ariaLabel?: string;
};

export type CompanyDetails = {
  name: string;
  address: string;
  zipCode: string;
  city: string;
  country?: string;
  contactItems: ContactItem[];
  socialLinks: SocialLink[];
  logos: LogoAsset[];
};

export const companyDetails: CompanyDetails = {
  name: "Nom de votre entreprise",
  address: "Adresse de votre entreprise",
  zipCode: "00000",
  city: "Ville",
  country: "Pays",
  contactItems: [
    {
      type: "phone",
      icon: "phone",
      href: "tel:+33123456789",
      label: "01 23 45 67 89",
    },
    {
      type: "mail",
      icon: "mail",
      href: "mailto:contact@votre-entreprise.fr",
      label: "contact@votre-entreprise.fr",
    }],
  socialLinks: [
    {
      name: "Facebook",
      icon: "facebook",
      href: "https://www.facebook.com/votreentreprise",
      ariaLabel: "Rejoindre l'entreprise sur Facebook",
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      href: "https://www.linkedin.com/company/votreentreprise",
      ariaLabel: "Visiter la page LinkedIn de l'entreprise",
    },
    {
      name: "GitHub",
      icon: "github",
      href: "https://github.com/votre-entreprise",
      ariaLabel: "Accéder au GitHub de l'entreprise",
    },
  ],
  logos: [
    {
      name: "Logo Principal",
      source: {
        src: "images/company-logo.svg",
        alt: "Logo de votre entreprise",
      }
    },
    {
      name: "Logo Full",
      source: {
        src: "images/company-logo-full.svg",
        alt: "Logo complet de votre entreprise",
      }
    }
  ] 
};


