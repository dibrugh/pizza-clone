import { useEffect, useState } from "react";
import { Variant } from "../components/shared/group-variants";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";
import { ProductVariant } from "@prisma/client";

type ReturnProps = {
	size: PizzaSize;
	type: PizzaType;
	selectedIngredients: Set<number>;
	setSize: (size: PizzaSize) => void;
	setType: (type: PizzaType) => void;
	addingIngredient: (id: number) => void;
	availableSizes: Variant[];
};
export const usePizzaOptions = (variants: ProductVariant[]): ReturnProps => {
	const [size, setSize] = useState<PizzaSize>(30);
	const [type, setType] = useState<PizzaType>(1);

	const [selectedIngredients, { toggle: addIngredient }] = useSet(
		new Set<number>([])
	);

	const availableSizes = getAvailablePizzaSizes(type, variants);

	useEffect(() => {
		const isAvailableSize = availableSizes?.find(
			(item) => Number(item.value) === size && !item.disabled
		);
		const availableSize = availableSizes?.find((item) => !item.disabled);
		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSize.value) as PizzaSize);
		}
	}, [availableSizes, size, type]);

	return {
		size,
		type,
		selectedIngredients,
		setSize,
		setType,
		availableSizes,
		addingIngredient: addIngredient,
	};
};
