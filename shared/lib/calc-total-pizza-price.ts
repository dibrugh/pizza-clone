import { Ingredient, ProductVariant } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Calculate total price of pizza by given variant, size and selected ingredients.
 * The function takes an array of all ingredients and an array of all product variants.
 * It will sum up the price of pizza variant and the prices of all selected ingredients.
 *
 * @param {PizzaType} variant - Variant of pizza (e.g. traditional, thin, etc.).
 * @param {PizzaSize} size - Size of pizza (e.g. 20, 30, 40, etc.).
 * @param {ProductVariant[]} variants - An array of all product variants.
 * @param {Ingredient[]} ingredients - An array of all ingredients.
 * @param {Set<number>} selectedIngredients - A set of ids of selected ingredients.
 * @returns {number} Total price of pizza.
 */

export const calcTotalPizzaPrice = (
	variant: PizzaType,
	size: PizzaSize,
	variants: ProductVariant[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const pizzaPrice =
		variants.find((item) => item.pizzaVariant === variant && item.size === size)
			?.price || 0;

	const totalIngredientsPrice = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0);

	return pizzaPrice + totalIngredientsPrice;
};
