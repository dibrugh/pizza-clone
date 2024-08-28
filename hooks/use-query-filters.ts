import qs from "qs";
import { useEffect } from "react";
import { Filters } from "./use-filters";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
	const router = useRouter();

	useEffect(() => {
		const params = {
			...filters.prices,
			pizzaVariants: Array.from(filters.pizzaVariants),
			sizes: Array.from(filters.sizes),
			ingredients: Array.from(filters.selectedIngredients),
		};

		const query = qs.stringify(params, {
			arrayFormat: "comma",
		});

		router.push(`?${query}`, { scroll: false });
	}, [filters, router]);
};
