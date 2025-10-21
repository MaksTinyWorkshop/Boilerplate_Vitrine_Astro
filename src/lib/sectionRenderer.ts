import type { CollectionEntry } from "astro:content";

import CatalogueSection from "@components/Catalogue/CatalogueSection.astro";
import CtaBanner from "@components/CTAs/CTABanner/CtaBanner.astro";
import CtaDownload from "@components/CTAs/CTADownload/CtaDownload.astro";
import FeatureGrid from "@components/Features/FeatureGrid.astro";
import HeroSection from "@components/Home/HeroSection.astro";
import MarkdownSection from "@components/Markdown/MarkdownSection.astro";
import ContactFormSection from "@components/Form/HandmadeForm/ContactFormSection.astro";
import Tarifs from "@components/Tarifs/Tarifs.astro";
import GoogleFormSection from "@components/Form/GoogleForm/GoogleFormSection.astro";
import FAQSection from "@components/FAQSection.astro";
import ParcoursSection from "@components/ParcoursSection.astro";
import ImagesGrid from "@components/ImagesGrid.astro";
import MapSection from "@components/MapSection.astro";
import TestimonialsSection from "@components/TestimonialsSection.astro";

const componentMap = {
  hero: HeroSection,
  "feature-grid": FeatureGrid,
  parcours: ParcoursSection,
  tarifs: Tarifs,
  faq: FAQSection,
  "contact-form": ContactFormSection,
  markdown: MarkdownSection,
  map: MapSection,
  cta: CtaBanner,
  "google-form": GoogleFormSection,
  images: ImagesGrid,
  catalogue: CatalogueSection,
  testimonials: TestimonialsSection,
} as const;

type SectionComponentName = keyof typeof componentMap;

type SectionComponentResult =
  | (typeof componentMap)[SectionComponentName]
  | typeof CtaDownload;

type ResolvedSection = {
  Component: SectionComponentResult;
  props: any;
};

export async function resolveSection(
  section: CollectionEntry<"sections">
): Promise<ResolvedSection> {
  const componentKey = section.data.component as SectionComponentName;
  const Component = componentMap[componentKey];

  if (!Component) {
    throw new Error(`Section inconnue: ${section.id}`);
  }

  switch (section.data.component) {
    case "hero":
      return {
        Component,
        props: {
          eyebrow: section.data.eyebrow,
          title: section.data.title,
          content: section.data.content,
          body: section.data.body,
          ctas: section.data.ctas,
          image: section.data.image,
          align: section.data.align,
          backgroundOverlay: section.data.backgroundOverlay,
        },
      };
    case "tarifs":
      return {
        Component,
        props: {
          defaultPlan: section.data.defaultPlan,
          plans: section.data.plans,
          options: section.data.options,
          modal: section.data.modal,
        },
      };
    case "feature-grid":
      return {
        Component,
        props: {
          eyebrow: section.data.eyebrow,
          title: section.data.title,
          description: section.data.description,
          features: section.data.features,
          display: section.data.display,
          theme: section.data.theme,
        },
      };
    case "parcours":
      return {
        Component,
        props: {
          title: section.data.title,
          schema: section.data.schema,
          description: section.data.description,
          steps: section.data.steps,
        },
      };
    case "faq":
      return {
        Component,
        props: {
          title: section.data.title,
          description: section.data.description,
          questions: section.data.questions,
        },
      };
    case "contact-form": {
      const legacyLayout = "layout" in section.data ? (section.data as any).layout : undefined;
      return {
        Component,
        props: {
          title: section.data.title,
          subtitle: section.data.subtitle,
          highlights: section.data.highlights,
          formulas: section.data.formulas,
          defaultFormula: section.data.defaultFormula,
          submitLabel: section.data.submitLabel,
          successMessage: section.data.successMessage,
          showFormulaSelect: section.data.showFormulaSelect,
          layout: section.data.structure ?? legacyLayout,
          submission: section.data.submission,
          structure: section.data.structure ?? legacyLayout,
          options: section.data.options,
        },
      };
    }
    case "markdown": {
      const { Content } = await section.render();
      return {
        Component,
        props: {
          title: section.data.title,
          description: section.data.description,
          variant: section.data.variant,
          images: section.data.images,
          Content,
        },
      };
    }
    case "map":
      return {
        Component,
        props: {
          title: section.data.title,
          caption: section.data.caption,
          embedUrl: section.data.embedUrl,
        },
      };
    case "google-form":
      return {
        Component,
        props: {
          title: section.data.title,
          description: section.data.description,
          formUrl: section.data.formUrl,
          height: section.data.height,
        },
      };
    case "cta": {
      const variant =
        section.data.variant ??
        (section.data.download || section.data.file ? "download" : "banner");
      const actions = section.data.actions ?? section.data.ctas ?? [];
      const theme = section.data.theme;
      const align = section.data.align;
      const body =
        section.data.body ??
        (variant === "download" ? undefined : section.data.content);

      if (variant === "download" || section.data.download || section.data.file) {
        const downloadConfig =
          section.data.download ??
          (section.data.file
            ? {
                label: section.data.file.label,
                href: section.data.file.href,
                name: section.data.downloadName,
              }
            : null);

        if (!downloadConfig) {
          throw new Error(`CTA download section missing download configuration: ${section.id}`);
        }

        const media =
          section.data.media ??
          (section.data.content && !section.data.body
            ? {
                src: section.data.content,
                alt: section.data.title,
              }
            : undefined);

        return {
          Component: CtaDownload,
          props: {
            variant: "download",
            title: section.data.title,
            description: section.data.description,
            note: section.data.note,
            download: downloadConfig,
            media,
            theme,
            align,
          },
        };
      }

      return {
        Component,
        props: {
          variant,
          theme,
          align,
          eyebrow: section.data.eyebrow,
          title: section.data.title,
          description: section.data.description,
          body,
          note: section.data.note,
          actions,
          media: section.data.media,
        },
      };
    }
    case "images":
      return {
        Component,
        props: {
          images: section.data.images,
        },
      };
    case "catalogue":
      return {
        Component,
        props: {
          eyebrow: section.data.eyebrow,
          title: section.data.title,
          intro: section.data.intro,
          categories: section.data.categories,
          defaultCategory: section.data.defaultCategory,
          footnote: section.data.footnote,
        },
      };
    case "testimonials":
      return {
        Component,
        props: {
          title: section.data.title,
          description: section.data.description,
          testimonials: section.data.testimonials,
        },
      };
    default:
      throw new Error(`Section non gérée: ${section.id}`);
  }
}
