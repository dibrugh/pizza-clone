import { pizzaSizes, PizzaVariant } from "../constants/pizza";
import { ProductVariant } from "@prisma/client";

export const getAvailablePizzaSizes = (
	variant: PizzaVariant,
	variants: ProductVariant[]
) => {
	const filteredPizzasByType = variants.filter(
		(item) => item.pizzaVariant === variant
	);

	return pizzaSizes.map((item) => ({
		name: item.name,
		value: item.value,
		disabled: !filteredPizzasByType.some(
			(pizza) => Number(pizza.size) === Number(item.value)
		),
	}));
};
