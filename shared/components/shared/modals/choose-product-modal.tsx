"use client";

import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCartStore } from "@/shared/store";

type Props = {
	product: ProductWithRelations;
	className?: string;
};

export const ChooseProductModal = ({ product, className }: Props) => {
	const router = useRouter();
	const firstItem = product.variants[0];
	const isPizzaVariant = Boolean(product.variants[0].pizzaVariant);
	const addCartItem = useCartStore((state) => state.addCartItem);

	const onAddProduct = () => {
		addCartItem({
			productVariantId: firstItem.id,
		});
	};

	const onAddPizza = (productVariantId: number, ingredients: number[]) => {
		addCartItem({
			productVariantId,
			ingredients,
		});
	};

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					"p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
					className
				)}
			>
				{isPizzaVariant ? (
					<ChoosePizzaForm
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={product.ingredients}
						variants={product.variants}
						onSubmit={onAddPizza}
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
						onSubmit={onAddProduct}
						price={firstItem.price}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
