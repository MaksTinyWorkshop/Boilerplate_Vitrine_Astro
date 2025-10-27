import { defineCollection, z } from "astro:content";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
} from "../lib/i18n/locales";

const localeSchema = z.enum(SUPPORTED_LOCALES);

const localizedFields = {
  lang: localeSchema.default(DEFAULT_LOCALE),
  translationKey: z.string().optional(),
};

const seoOpenGraphSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  type: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

const seoTwitterSchema = z.object({
  card: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  site: z.string().optional(),
  creator: z.string().optional(),
});

const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  canonical: z.string().optional(),
  robots: z.string().optional(),
  keywords: z.union([z.array(z.string()), z.string()]).optional(),
  openGraph: seoOpenGraphSchema.optional(),
  twitter: seoTwitterSchema.optional(),
  structuredData: z
    .union([z.record(z.string(), z.any()), z.array(z.record(z.string(), z.any()))])
    .optional(),
  noindex: z.boolean().optional(),
});

const callToActionSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.string().optional(),
});

const tarifsOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  price: z.string(),
  type: z.enum(["base", "video", "extra"]).default("extra"),
  defaultSelected: z.boolean().optional(),
  disabled: z.boolean().optional(),
  defaultQuantity: z.number().optional(),
  minQuantity: z.number().optional(),
  maxQuantity: z.number().optional(),
  step: z.number().optional(),
  unitPrice: z.number().optional(),
  priceSuffix: z.string().optional(),
  showCounter: z.boolean().optional(),
});

const tarifsPlanSchema = z.object({
  slug: z.string(),
  badge: z.string().optional(),
  icon: z.string().optional(),
  subtitle: z.string().optional(),
  price: z.string(),
  footnote: z.string().optional(),
  description: z.string().optional(),
  moreInfoTitle: z.string().optional(),
  moreInfoContent: z.string().optional(),
  availableOptions: z.array(z.string()).optional(),
});

const tarifsSchema = z.object({
  component: z.literal("tarifs"),
  defaultPlan: z.string(),
  plans: z.array(tarifsPlanSchema).min(1),
  options: z.array(tarifsOptionSchema).min(1),
  modal: z
    .object({
      title: z.string().optional(),
      content: z.string(),
    })
    .optional(),
}).extend(localizedFields);

const heroSchema = z.object({
  component: z.literal("hero"),
  eyebrow: z.string().optional(),
  title: z.string(),
  content: z.string().optional(),
  body: z.string().optional(),
  image: z
    .object({
      src: z.string(),
      alt: z.string().optional(),
    })
    .optional(),
  ctas: z.array(callToActionSchema).optional(),
  align: z.enum(["start", "center"]).optional(),
  backgroundOverlay: z.boolean().optional(),
}).extend(localizedFields);

const featureGridSchema = z.object({
  component: z.literal("feature-grid"),
  key: z.string().optional(),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  display: z.enum(["grid", "list"]).optional(),
  theme: z.enum(["light", "dark", "accent"]).optional(),
  features: z
    .array(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
        image: z
          .object({
            src: z.string(),
            alt: z.string().optional(),
          })
          .optional(),
      })
    )
    .min(1),
}).extend(localizedFields);

const parcoursSchema = z.object({
  component: z.literal("parcours"),
  title: z.string(),
  schema: z.string().optional(),
  description: z.string().optional(),
  steps: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
      })
    )
    .min(1),
}).extend(localizedFields);

const faqSchema = z.object({
  component: z.literal("faq"),
  title: z.string(),
  description: z.string().optional(),
  questions: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
        role: z.string().optional(),
      })
    )
    .min(1),
}).extend(localizedFields);

const contactFormFieldSchema = z.object({
  id: z.string(),
  label: z.string(),
  placeholder: z.string().optional(),
  type: z
    .enum(["text", "email", "tel", "number", "textarea", "select"])
    .default("text"),
  required: z.boolean().default(true),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  options: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        submissionValue: z.string().optional(),
      })
    )
    .optional(),
  submissionName: z.string().optional(),
  submissionValue: z.string().optional(),
});

const contactFormStaticFieldSchema = z.object({
  name: z.string(),
  value: z.string(),
});

const contactFormSubmissionSchema = z.object({
  endpoint: z.string().optional(),
  sheet: z.string().optional(),
  staticFields: z.array(contactFormStaticFieldSchema).optional(),
});

const contactFormLayoutGroupSchema = z.object({
  title: z.string(),
  rows: z.array(z.array(z.string().min(1)).min(1)).min(1),
});

const contactFormLayoutSchema = z.object({
  mode: z.enum(["grouped", "stacked"]).optional(),
  groups: z.array(contactFormLayoutGroupSchema).optional(),
  includeRemainingFields: z.boolean().optional(),
  remainingGroupTitle: z.string().optional(),
  showTitles: z.boolean().optional(),
});

const contactFormOptionsSchema = z.object({
  showFormulaSelect: z.boolean().optional(),
  layout: contactFormLayoutSchema.optional(),
  submission: contactFormSubmissionSchema.optional(),
});

const contactFormFormulaSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  helper: z.string().optional(),
  submissionName: z.string().optional(),
  submissionValue: z.string().optional(),
  fields: z.array(contactFormFieldSchema).min(1),
  submitLabel: z.string().optional(),
  submission: contactFormSubmissionSchema.optional(),
});

const contactFormHighlightSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  targetFormula: z.string().optional(),
});

const contactFormSchema = z.object({
  component: z.literal("contact-form"),
  title: z.string(),
  subtitle: z.string().optional(),
  highlights: z.array(contactFormHighlightSchema).optional(),
  formulas: z.array(contactFormFormulaSchema).min(1),
  defaultFormula: z.string().optional(),
  submitLabel: z.string().optional(),
  successMessage: z.string().optional(),
  showFormulaSelect: z.boolean().optional(),
  submission: contactFormSubmissionSchema.optional(),
  structure: contactFormLayoutSchema.optional(),
  options: contactFormOptionsSchema.optional(),
}).extend(localizedFields);

const markdownSchema = z.object({
  component: z.literal("markdown"),
  title: z.string().optional(),
  description: z.string().optional(),
  variant: z.string().optional(),
  images: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string().optional(),
        caption: z.string().optional(),
      })
    )
    .optional(),
}).extend(localizedFields);

const mapSchema = z.object({
  component: z.literal("map"),
  title: z.string().optional(),
  caption: z.string().optional(),
  embedUrl: z.string(),
}).extend(localizedFields);

const ctaSchema = z.object({
  component: z.literal("cta"),
  variant: z.enum(["banner", "card", "text-only", "download"]).optional(),
  theme: z.enum(["light", "dark", "accent"]).optional(),
  align: z.enum(["start", "center", "end"]).optional(),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  body: z.string().optional(),
  content: z.string().optional(),
  note: z.string().optional(),
  actions: z.array(callToActionSchema).optional(),
  ctas: z.array(callToActionSchema).optional(),
  media: z
    .object({
      src: z.string(),
      alt: z.string().optional(),
    })
    .optional(),
  download: z
    .object({
      label: z.string(),
      href: z.string(),
      name: z.string().optional(),
    })
    .optional(),
  downloadName: z.string().optional(),
  file: callToActionSchema.optional(),
}).extend(localizedFields);

const googleFormSchema = z.object({
  component: z.literal("google-form"),
  title: z.string().optional(),
  description: z.string().optional(),
  formUrl: z.string().url(),
  height: z.number().optional(),
}).extend(localizedFields);

const imagesSchema = z.object({
  component: z.literal("images"),
  images: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string().optional(),
        caption: z.string().optional(),
      })
    )
    .min(1),
}).extend(localizedFields);

const catalogueItemSchema = z.object({
  title: z.string(),
  reference: z.string().optional(),
  description: z.string().optional(),
  price: z.string().optional(),
  image: z
    .object({
      src: z.string(),
      alt: z.string().optional(),
    })
    .optional(),
  cta: callToActionSchema.optional(),
});

const catalogueCategorySchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  note: z.string().optional(),
  items: z.array(catalogueItemSchema).min(1),
});

const catalogueSchema = z.object({
  component: z.literal("catalogue"),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  intro: z.string().optional(),
  categories: z.array(catalogueCategorySchema).default([]),
  defaultCategory: z.string().optional(),
  footnote: z.string().optional(),
}).extend(localizedFields);

const testimonialsSchema = z.object({
  component: z.literal("testimonials"),
  title: z.string(),
  description: z.string().optional(),
  testimonials: z
    .array(
      z.object({
        quote: z.string(),
        author: z.string(),
        role: z.string().optional(),
      })
    )
    .min(1),
}).extend(localizedFields);

const sectionSchema = z.discriminatedUnion("component", [
  heroSchema,
  featureGridSchema,
  parcoursSchema,
  faqSchema,
  contactFormSchema,
  markdownSchema,
  mapSchema,
  ctaSchema,
  googleFormSchema,
  imagesSchema,
  catalogueSchema,
  testimonialsSchema,
  tarifsSchema,
]);

const sections = defineCollection({
  type: "content",
  schema: sectionSchema,
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.string().optional(),
    translationKey: z.string(),
    lang: localeSchema.default(DEFAULT_LOCALE),
    draft: z.boolean().default(false),
    order: z.number().optional(),
    seo: seoSchema.optional(),
    sections: z.array(
      z.object({
        slug: z.string(),
      })
    ),
  }),
});

export const collections = {
  pages,
  sections,
};
