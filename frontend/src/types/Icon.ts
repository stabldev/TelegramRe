export type VariantIcon = {
  class?: string;
  variant: string;
  classList?: Record<string, boolean>;
};

export type Icon = Omit<VariantIcon, "variant">;
