import { axiosInstance } from "./axios";
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto";

export const fetchCart = async (): Promise<CartDTO> => {
	const { data } = await axiosInstance.get<CartDTO>("/cart");

	return data;
};

export const updateItemQuantity = async (itemId: number, quantity: number) => {
	const { data } = await axiosInstance.patch<CartDTO>(`/cart/${itemId}`, {
		quantity,
	});

	return data;
};

export const removeCartItem = async (itemId: number) => {
	const { data } = await axiosInstance.delete<CartDTO>(`/cart/${itemId}`);

	return data;
};

export const addCartItem = async (values: CreateCartItemValues) => {
	const { data } = await axiosInstance.post<CartDTO>("/cart", values);

	return data;
};
