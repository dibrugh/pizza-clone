import { Package, Percent, Truck, ArrowRight } from "lucide-react";
import { Button } from "../ui";
import { CheckoutItemDetails } from "./checkout-item-details";
import { WhiteBlock } from "./white-block";

type Props = {
	totalAmount: number;
	vatPrice: number;
	deliveryPrice: number;
	totalPrice: number;
	className?: string;
};

export const CheckoutSidebar = ({
	className,
	totalAmount,
	vatPrice,
	deliveryPrice,
	totalPrice,
}: Props) => {
	return (
		<WhiteBlock className="p-6 sticky top-4">
			<div className="flex flex-col gap-1">
				<span className="text-xl">Итого: </span>
				<span className="text-3xl font-extrabold">{totalPrice} ₽</span>
			</div>

			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Package size={18} className="mr-2 text-gray-300" />
						Стоимость товаров:
					</div>
				}
				value={`${totalAmount} ₽`}
			/>
			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Percent size={18} className="mr-2 text-gray-300" />
						Налоги:
					</div>
				}
				value={`${vatPrice} ₽`}
			/>
			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Truck size={18} className="mr-2 text-gray-300" />
						Доставка:
					</div>
				}
				value={`${deliveryPrice} ₽`}
			/>

			<Button
				type="submit"
				className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
			>
				Перейти к оплате
				<ArrowRight className="w-5 ml-2" />
			</Button>
		</WhiteBlock>
	);
};
