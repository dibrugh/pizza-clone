import { Ingredient, ProductVariant } from "@prisma/client";
import { PizzaType, PizzaSize, mapPizzaType } from "../constants/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

export const getPizzaDetails = (
	type: PizzaType,
	size: PizzaSize,
	variants: ProductVariant[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const totalPrice = calcTotalPizzaPrice(
		type,
		size,
		variants,
		ingredients,
		selectedIngredients
	);

	const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;

	return { totalPrice, textDetails };
};
