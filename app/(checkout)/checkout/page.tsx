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
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

export default function CheckoutPage() {
	const [submitting, setSubmitting] = useState(false);
	const { totalAmount, items, loading, updateItemQuantity, removeCartItem } =
		useCart();

	const { data: session } = useSession();

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

	useEffect(() => {
		async function fetchUserInfo() {
			const data = await Api.auth.getMe();
			const [firstName, lastName] = data.fullName.split(" ");

			form.setValue("firstName", firstName);
			form.setValue("lastName", lastName);
			form.setValue("email", data.email);
		}

		if (session) {
			fetchUserInfo();
		}
	}, [session]);

	const onSubmit = async (data: CheckoutFormSchema) => {
		try {
			setSubmitting(true);

			const url = await createOrder(data);
			toast.success("Order created successfully", {
				icon: "👏",
			});

			if (url) {
				location.href = url;
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to create order", {
				icon: "🥲",
			});
		} finally {
			setSubmitting(false);
		}
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
								loading={loading || submitting}
								totalAmount={totalAmount}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
