import { useEffect } from "react";
import { useCartStore } from "../store";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart.dto";

type ReturnProps = {
	totalAmount: number;
	items: CartStateItem[];
	loading: boolean;
	updateItemQuantity: (id: number, quantity: number) => void;
	removeCartItem: (id: number) => void;
	addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
	const [
		totalAmount,
		items,
		loading,
		addCartItem,
		fetchCartItems,
		updateItemQuantity,
		removeCartItem,
	] = useCartStore((state) => [
		state.totalAmount,
		state.items,
		state.loading,
		state.addCartItem,
		state.fetchCartItems,
		state.updateItemQuantity,
		state.removeCartItem,
	]);

	useEffect(() => {
		fetchCartItems();
	}, [fetchCartItems]);

	return {
		totalAmount,
		items,
		loading,
		addCartItem,
		updateItemQuantity,
		removeCartItem,
	};
};
