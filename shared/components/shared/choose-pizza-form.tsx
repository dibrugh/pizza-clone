import { PizzaImage } from "./pizza-image";
import { Button } from "../ui";
import { Title } from "./title";
import { IngredientItem } from "./ingredient-item";
import { GroupVariants } from "./group-variants";
import { cn } from "@/shared/lib/utils";
import { PizzaSize, PizzaType, pizzaType } from "@/shared/constants/pizza";
import { Ingredient, ProductVariant } from "@prisma/client";
import { getPizzaDetails } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";

type Props = {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	variants: ProductVariant[];
	onSubmit: (itemId: number, ingredients: number[]) => void;
	className?: string;
};

export const ChoosePizzaForm = ({
	imageUrl,
	name,
	ingredients,
	variants,
	onSubmit,
	className,
}: Props) => {
	const {
		size,
		type,
		setSize,
		setType,
		addingIngredient,
		availableSizes,
		currentItemId,
		selectedIngredients,
	} = usePizzaOptions(variants);

	const { textDetails, totalPrice } = getPizzaDetails(
		type,
		size,
		variants,
		ingredients,
		selectedIngredients
	);

	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredients));
		}
	};

	return (
		<div className={cn(className, "flex flex-1")}>
			<PizzaImage imageUrl={imageUrl} size={size} />

			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />

				<p className="text-gray-400">{textDetails}</p>

				<div className="flex flex-col gap-4 mt-5">
					<GroupVariants
						variants={availableSizes}
						value={String(size)}
						onClick={(value) => setSize(Number(value) as PizzaSize)}
					/>

					<GroupVariants
						variants={pizzaType}
						value={String(type)}
						onClick={(value) => setType(Number(value) as PizzaType)}
					/>
				</div>

				<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto mt-5 scrollbar">
					<div className="grid grid-cols-3 gap-3">
						{ingredients.map((ingredient) => (
							<IngredientItem
								key={ingredient.id}
								active={selectedIngredients.has(ingredient.id)}
								onClick={() => addingIngredient(ingredient.id)}
								{...ingredient}
							/>
						))}
					</div>
				</div>

				<Button
					onClick={handleClickAdd}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
				>
					Добавить в коризну за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
};
