import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useState, useEffect } from "react";

export const useIngredients = () => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [loading, setLoading] = useState(true);

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
	};
};
