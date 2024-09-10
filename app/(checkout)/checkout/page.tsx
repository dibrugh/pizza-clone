"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	CheckoutCart,
	CheckoutPersonalData,
	CheckoutAddressData,
	CheckoutSidebar,
	Container,
	Title,
} from "@/shared/components";
import { CheckoutFormSchema, checkoutFormSchema } from "@/shared/constants";
import { useCart } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";

export default function CheckoutPage() {
	const { totalAmount, items, loading, updateItemQuantity, removeCartItem } =
		useCart();

	const form = useForm<CheckoutFormSchema>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			phone: "",
			address: "",
			comment: "",
		},
	});

	const onSubmit = (data: CheckoutFormSchema) => {
		console.log(data);
	};

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: "plus" | "minus"
	) => {
		const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<Container className="mt-10">
			<Title
				text="Оформление заказа"
				className="font-extrabold mb-8 text-[36px]"
			/>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex gap-10">
						{/* Left side */}
						<div className="flex flex-col gap-10 flex-1 mb-20">
							<CheckoutCart
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								items={items}
								loading={loading}
							/>
							<CheckoutPersonalData
								className={loading ? "opacity-40 pointer-events-none" : ""}
							/>
							<CheckoutAddressData
								className={loading ? "opacity-40 pointer-events-none" : ""}
							/>
						</div>

						{/* Right side */}
						<div className="w-[450px]">
							<CheckoutSidebar
								{...{
									totalAmount,
									loading,
								}}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
