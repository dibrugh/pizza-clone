import qs from "qs";
import { useEffect, useRef } from "react";
import { Filters } from "./use-filters";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
	const router = useRouter();
	const isMounted = useRef(false);

	useEffect(() => {
		if (isMounted.current) {
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
		}

		isMounted.current = true;
	}, [filters, router]);
};
