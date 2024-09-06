"use client";

import {
	CheckoutItem,
	CheckoutItemDetails,
	Container,
	Title,
	WhiteBlock,
} from "@/shared/components/shared";
import { Button, Input, Textarea } from "@/shared/components/ui";
import { PizzaType, PizzaSize } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";
import { getCartItemDetails } from "@/shared/lib";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";

export default function Checkout() {
	const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

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

			<div className="flex gap-10">
				<div className="flex flex-col gap-10 flex-1 mb-20">
					<WhiteBlock title="1. Корзина">
						<div className="flex flex-col gap-5">
							{items.map((item) => (
								<CheckoutItem
									key={item.id}
									details={getCartItemDetails(
										item.ingredients,
										item.pizzaType as PizzaType,
										item.pizzaSize as PizzaSize
									)}
									disabled={item.disabled}
									{...item}
									onClickCountButton={(type) =>
										onClickCountButton(item.id, item.quantity, type)
									}
									onClickRemove={() => removeCartItem(item.id)}
								/>
							))}
						</div>
					</WhiteBlock>

					<WhiteBlock title="2. Персональные данные">
						{/* Left side */}
						<div className="grid grid-cols-2 gap-5">
							<Input name="firstName" className="text-base" placeholder="Имя" />
							<Input
								name="lastName"
								className="text-base"
								placeholder="Фамилия"
							/>
							<Input name="email" className="text-base" placeholder="E-mail" />
							<Input name="phone" className="text-base" placeholder="Телефон" />
						</div>
					</WhiteBlock>

					<WhiteBlock title="3. Адрес доставки">
						{/* Left side */}
						<div className="flex flex-col gap-5">
							<Input name="address" className="text-base" placeholder="Адрес" />
							<Textarea
								rows={5}
								className="text-base"
								placeholder="Комментарии к заказу"
							/>
						</div>
					</WhiteBlock>
				</div>

				{/* Right side */}
				<div className="w-[450px]">
					<WhiteBlock className="p-6 sticky top-4">
						<div className="flex flex-col gap-1">
							<span className="text-xl">Итого: </span>
							<span className="text-3xl font-extrabold">{totalAmount} ₽</span>
						</div>

						<CheckoutItemDetails
							title={
								<div className="flex items-center">
									<Package size={18} className="mr-2 text-gray-300" />
									Стоимость товаров:
								</div>
							}
							value="350 ₽"
						/>
						<CheckoutItemDetails
							title={
								<div className="flex items-center">
									<Percent size={18} className="mr-2 text-gray-300" />
									Налоги:
								</div>
							}
							value="350 ₽"
						/>
						<CheckoutItemDetails
							title={
								<div className="flex items-center">
									<Truck size={18} className="mr-2 text-gray-300" />
									Доставка:
								</div>
							}
							value="350 ₽"
						/>

						<Button
							type="submit"
							className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
						>
							Перейти к оплате
							<ArrowRight className="w-5 ml-2" />
						</Button>
					</WhiteBlock>
				</div>
			</div>
		</Container>
	);
}
