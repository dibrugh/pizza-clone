import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO) => {
	return (
		(item.productVariant.price +
			item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)) *
		item.quantity
	);
};
