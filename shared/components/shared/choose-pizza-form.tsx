import { cn } from "@/shared/lib/utils";
import React, { useState } from "react";
import { PizzaImage } from "./pizza-image";

import { Button } from "../ui";
import { Title } from "./title";
import { GroupVariants } from "./group-variants";
import {
	mapPizzaVariant,
	PizzaSize,
	pizzaSizes,
	PizzaVariant,
	pizzaVariants,
} from "@/shared/constants/pizza";
import { Ingredient, ProductVariant } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { useSet } from "react-use";

type Props = {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	variants: ProductVariant[];
	onClickAddCart?: VoidFunction;
	className?: string;
};

export const ChoosePizzaForm = ({
	imageUrl,
	name,
	ingredients,
	variants,
	onClickAddCart,
	className,
}: Props) => {
	const [size, setSize] = useState<PizzaSize>(30);
	const [variant, setVariant] = useState<PizzaVariant>(1);

	const [selectedIngredients, { toggle: addIngredient }] = useSet(
		new Set<number>([])
	);

	const textDetails = `${size} см, ${mapPizzaVariant[variant]} тесто`;

	//TODO: reset choice if pizza doesn't exist
	const pizzaPrice =
		variants.find((item) => item.pizzaVariant === variant && item.size === size)
			?.price || 0;
	const totalIngredientsPrice = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0);

	const totalPrice = pizzaPrice + totalIngredientsPrice;

	const handleClickAddCart = () => {
		onClickAddCart?.();
	};

	const availablePizzas = variants.filter(
		(item) => item.pizzaVariant === variant
	);

	return (
		<div className={cn(className, "flex flex-1")}>
			<PizzaImage imageUrl={imageUrl} size={size} />

			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />

				<p className="text-gray-400">{textDetails}</p>

				<div className="flex flex-col gap-4 mt-5">
					<GroupVariants
						variants={pizzaSizes}
						value={String(size)}
						onClick={(value) => setSize(Number(value) as PizzaSize)}
					/>

					<GroupVariants
						variants={pizzaVariants}
						value={String(variant)}
						onClick={(value) => setVariant(Number(value) as PizzaVariant)}
					/>
				</div>

				<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto mt-5 scrollbar">
					<div className="grid grid-cols-3 gap-3">
						{ingredients.map((ingredient) => (
							<IngredientItem
								key={ingredient.id}
								active={selectedIngredients.has(ingredient.id)}
								onClick={() => addIngredient(ingredient.id)}
								{...ingredient}
							/>
						))}
					</div>
				</div>

				<Button
					onClick={handleClickAddCart}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
				>
					Добавить в коризну за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
};
