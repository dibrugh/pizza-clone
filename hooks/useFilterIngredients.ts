import { useEffect, useState } from "react";
import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useSet } from "react-use";

type ReturnProps = {
	ingredients: Ingredient[];
	loading: boolean;
	selectedIngredients: Set<string>;
	onToggle: (id: string) => void;
};

export const useFilterIngredients = (): ReturnProps => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [loading, setLoading] = useState(true);

	const [selectedIds, { toggle }] = useSet(new Set<string>([]));

	useEffect(() => {
		async function fetchIngredients() {
			try {
				setLoading(true);
				const ingredients = await Api.ingredients.getAllIngredients();
				setIngredients(ingredients);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}

		fetchIngredients();
	}, []);

	return {
		ingredients,
		loading,
		selectedIngredients: selectedIds,
		onToggle: toggle,
	};
};
