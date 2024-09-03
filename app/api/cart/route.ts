import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib";

export async function GET(req: NextRequest) {
	try {
		const userId = 1;
		const token = req.cookies.get("cartToken")?.value;

		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] });
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [{ userId }, { token }],
			},
			include: {
				items: {
					orderBy: {
						createdAt: "desc",
					},
					include: {
						productVariant: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		});

		return NextResponse.json(userCart);
	} catch (error) {
		console.log("[CART_GET] Server Error", error);
		return NextResponse.json(
			{ message: "Failed to get cart" },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get("cartToken")?.value;

		if (!token) {
			token = crypto.randomUUID();
		}

		const userCart = await findOrCreateCart(token);

		const data = (await req.json()) as CreateCartItemValues;

		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productVariantId: data.productVariantId,
				ingredients: {
					every: {
						id: {
							in: data.ingredients,
						},
					},
				},
			},
		});
		// If cart item already exists update quantity + 1
		if (findCartItem) {
			await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			});
		}

		await prisma.cartItem.create({
			data: {
				cartId: userCart.id,
				productVariantId: data.productVariantId,
				quantity: 1,
				ingredients: {
					connect: data.ingredients?.map((id) => ({
						id,
					})),
				},
			},
		});

		const updatedUserCart = await updateCartTotalAmount(token);

		const response = NextResponse.json(updatedUserCart);

		response.cookies.set({
			name: "cartToken",
			value: token,
			maxAge: 60 * 60 * 24 * 7,
		});

		return response;
	} catch (error) {
		console.log("[CART_POST] Server Error", error);
		return NextResponse.json(
			{ message: "Failed to create cart" },
			{ status: 500 }
		);
	}
}