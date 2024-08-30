export const mapSize = {
	20: "Маленькая",
	30: "Средняя",
	40: "Большая",
} as const;

export const mapPizzaType = {
	1: "Традиционное",
	2: "Тонкое",
} as const;

export const pizzaSizes = Object.entries(mapSize).map(([value, name]) => ({
	name,
	value,
}));

export const pizzaType = Object.entries(mapPizzaType).map(([value, name]) => ({
	name,
	value,
}));

export type PizzaSize = keyof typeof mapSize;
export type PizzaType = keyof typeof mapPizzaType;
