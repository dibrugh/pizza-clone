import {
	Cart,
	CartItem,
	Ingredient,
	Product,
	ProductVariant,
} from "@prisma/client";

export type CartItemDTO = CartItem & {
	productVariant: ProductVariant & { product: Product };
	ingredients: Ingredient[];
};
export type CartDTO = {
	items: CartItemDTO[];
} & Cart;

export type CreateCartItemValues = {
	productVariantId: number;
	ingredients?: number[];
};
