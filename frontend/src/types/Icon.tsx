export type VariantIcon = {
	class?: string;
	variant: string;
};

export type Icon = Omit<VariantIcon, "variant">;
