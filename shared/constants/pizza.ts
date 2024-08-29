export const mapSize = {
	20: "Маленькая",
	30: "Средняя",
	40: "Большая",
} as const;

export const mapPizzaVariant = {
	1: "Традиционное",
	2: "Тонкое",
} as const;

export const pizzaSizes = Object.entries(mapSize).map(([value, name]) => ({
	name,
	value,
}));

export const pizzaVariants = Object.entries(mapPizzaVariant).map(
	([value, name]) => ({
		name,
		value,
	})
);

export type PizzaSize = keyof typeof mapSize;
export type PizzaVariant = keyof typeof mapPizzaVariant;
