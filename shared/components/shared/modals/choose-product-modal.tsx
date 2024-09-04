"use client";

import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";

type Props = {
	product: ProductWithRelations;
	className?: string;
};

export const ChooseProductModal = ({ product, className }: Props) => {
	const router = useRouter();
	const firstItem = product.variants[0];
	const isPizzaVariant = Boolean(product.variants[0].pizzaVariant);
	const [addCartItem, loading] = useCartStore((state) => [
		state.addCartItem,
		state.loading,
	]);

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
			router.back();
		} catch (error) {
			console.error(error);
			toast.error("Failed to add product to cart");
		}
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
						onSubmit={onSubmit}
						loading={loading}
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
						onSubmit={onSubmit}
						price={firstItem.price}
						loading={loading}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
