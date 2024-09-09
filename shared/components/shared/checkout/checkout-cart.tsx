import { PizzaType, PizzaSize } from "@/shared/constants/pizza";
import { getCartItemDetails } from "@/shared/lib";
import { CheckoutItem } from "../checkout-item";
import { WhiteBlock } from "../white-block";
import { CartStateItem } from "@/shared/lib/get-cart-details";

type Props = {
	items: CartStateItem[];
	onClickCountButton: (
		id: number,
		quantity: number,
		type: "plus" | "minus"
	) => void;
	removeCartItem: (id: number) => void;
	className?: string;
};

export const CheckoutCart = ({
	items,
	onClickCountButton,
	removeCartItem,
	className,
}: Props) => {
	return (
		<WhiteBlock title="1. Корзина" className={className}>
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
	);
};
