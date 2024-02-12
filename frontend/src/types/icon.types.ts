export type VariantIcon = {
	class?: string;
	variant: string;
	classList?: any;
};

export type Icon = Omit<VariantIcon, "variant">;
