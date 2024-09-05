import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useSet } from "react-use";

type PriceRange = {
	priceFrom?: number;
	priceTo?: number;
};
type QueryFilters = {
	pizzaVariants: string[];
	sizes: string;
	ingredients: string[];
} & PriceRange;

export type Filters = {
	sizes: Set<string>;
	pizzaVariants: Set<string>;
	selectedIngredients: Set<string>;
	prices: PriceRange;
};

type ReturnProps = {
	setPrices: (name: keyof PriceRange, value: number) => void;
	setPizzaVariants: (value: string) => void;
	setSizes: (value: string) => void;
	setSelectedIngredients: (value: string) => void;
} & Filters;

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFilters,
		string
	>;

	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(searchParams.get("ingredients")?.split(","))
	);

	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(
			searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
		)
	);

	const [pizzaVariants, { toggle: togglePizzaVariants }] = useSet(
		new Set<string>(
			searchParams.has("pizzaVariants")
				? searchParams.get("pizzaVariants")?.split(",")
				: []
		)
	);

	const [prices, setPrices] = useState<PriceRange>({
		priceFrom: Number(searchParams.get("priceFrom")) || undefined,
		priceTo: Number(searchParams.get("priceTo")) || undefined,
	});

	const updatePrice = (name: keyof PriceRange, value: number) => {
		setPrices((prev) => ({ ...prev, [name]: value }));
	};

	return useMemo(
		() => ({
			sizes,
			pizzaVariants,
			selectedIngredients,
			prices,
			setPrices: updatePrice,
			setPizzaVariants: togglePizzaVariants,
			setSizes: toggleSizes,
			setSelectedIngredients: toggleIngredients,
		}),
		[sizes, pizzaVariants, selectedIngredients, prices]
	);
};
