export type FormFieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "textarea"
  | "select";

export type ContactFormLayoutMode = "grouped" | "stacked";

export interface FormField {
  id: string;
  label: string;
  placeholder?: string;
  type?: FormFieldType;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: {
    label: string;
    value: string;
    submissionValue?: string;
  }[];
  submissionName?: string;
  submissionValue?: string;
}

export interface FormSubmissionStaticField {
  name: string;
  value: string;
}

export interface FormSubmissionConfig {
  endpoint?: string;
  sheet?: string;
  staticFields?: FormSubmissionStaticField[];
}

export interface FormFormula {
  id: string;
  label: string;
  description?: string;
  helper?: string;
  submitLabel?: string;
  submissionName?: string;
  submissionValue?: string;
  fields: FormField[];
  submission?: FormSubmissionConfig;
}

export interface ContactFormLayoutOptions {
  mode?: ContactFormLayoutMode;
  groups?: {
    title: string;
    rows: string[][];
  }[];
  includeRemainingFields?: boolean;
  remainingGroupTitle?: string;
  showTitles?: boolean;
}

export interface ContactFormSubmissionOptions extends FormSubmissionConfig {}

export interface ContactFormOptions {
  showFormulaSelect?: boolean;
  layout?: ContactFormLayoutOptions;
  submission?: ContactFormSubmissionOptions;
}

export interface ContactFormHighlight {
  title: string;
  description?: string;
  targetFormula?: string;
}

export interface ContactFormSectionProps {
  title: string;
  subtitle?: string;
  highlights?: ContactFormHighlight[];
  formulas: FormFormula[];
  defaultFormula?: string;
  submitLabel?: string;
  successMessage?: string;
  showFormulaSelect?: boolean;
  layout?: ContactFormLayoutOptions;
  structure?: ContactFormLayoutOptions;
  submission?: ContactFormSubmissionOptions;
  options?: ContactFormOptions;
  groupLayout?: ContactFormLayoutOptions["groups"];
  includeRemainingFields?: boolean;
  remainingGroupTitle?: string;
}
