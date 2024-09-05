"use client";

import toast from "react-hot-toast";
import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

type Props = {
	product: ProductWithRelations;
	onSubmit?: VoidFunction;
};

export const ProductForm = ({ product, onSubmit: _onSubmit }: Props) => {
	const [addCartItem, loading] = useCartStore((state) => [
		state.addCartItem,
		state.loading,
	]);
	const firstItem = product.variants[0];
	const isPizzaVariant = Boolean(product.variants[0].pizzaVariant);

	const onSubmit = async (
		productVariantId?: number,
		ingredients?: number[]
	) => {
		try {
			const itemId = productVariantId ?? firstItem.id;
			await addCartItem({
				productVariantId: itemId,
				ingredients,
			});
			toast.success(product.name + " product added to cart");
			_onSubmit?.();
		} catch (error) {
			console.error(error);
			toast.error("Failed to add product to cart");
		}
	};

	if (isPizzaVariant) {
		return (
			<ChoosePizzaForm
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredients}
				variants={product.variants}
				onSubmit={onSubmit}
				loading={loading}
			/>
		);
	}

	return (
		<ChooseProductForm
			imageUrl={product.imageUrl}
			name={product.name}
			onSubmit={onSubmit}
			price={firstItem.price}
			loading={loading}
		/>
	);
};
