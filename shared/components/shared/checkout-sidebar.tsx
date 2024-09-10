import { Package, Percent, Truck, ArrowRight } from "lucide-react";
import { Button, Skeleton } from "../ui";
import { CheckoutItemDetails } from "./checkout-item-details";
import { WhiteBlock } from "./white-block";
import { cn } from "@/shared/lib/utils";

type Props = {
	totalAmount: number;
	loading?: boolean;
	className?: string;
};

const VAT = 15;
const DELIVERY_PRICE = 250;

export const CheckoutSidebar = ({ className, totalAmount, loading }: Props) => {
	const vatPrice = totalAmount * (VAT / 100);
	const deliveryPrice = totalAmount > 0 ? DELIVERY_PRICE : 0;
	const totalPrice = totalAmount + vatPrice + deliveryPrice;
	return (
		<WhiteBlock className={cn("p-6 sticky top-4", className)}>
			<div className="flex flex-col gap-1">
				<span className="text-xl">Итого: </span>
				{loading ? (
					<Skeleton className="w-full h-11" />
				) : (
					<span className="text-3xl font-extrabold h-11">{totalPrice} ₽</span>
				)}
			</div>

			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Package size={18} className="mr-2 text-gray-300" />
						Стоимость товаров:
					</div>
				}
				value={
					loading ? (
						<Skeleton className="w-16 h-6 rounded-sm" />
					) : (
						`${totalAmount} ₽`
					)
				}
			/>
			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Percent size={18} className="mr-2 text-gray-300" />
						Налоги:
					</div>
				}
				value={
					loading ? (
						<Skeleton className="w-16 h-6 rounded-sm" />
					) : (
						`${vatPrice} ₽`
					)
				}
			/>
			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Truck size={18} className="mr-2 text-gray-300" />
						Доставка:
					</div>
				}
				value={
					loading ? (
						<Skeleton className="w-16 h-6 rounded-sm" />
					) : (
						`${deliveryPrice} ₽`
					)
				}
			/>

			<Button
				loading={loading}
				type="submit"
				className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
			>
				Перейти к оплате
				<ArrowRight className="w-5 ml-2" />
			</Button>
		</WhiteBlock>
	);
};
