"use server";

import { prisma } from "@/prisma/prisma-client";
import {
	PayOrderTemplate,
	VerificationUserTemplate,
} from "@/shared/components";
import { CheckoutFormSchema } from "@/shared/constants";
import { createPayment, sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-user-session";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormSchema) {
	try {
		const cookieStore = cookies();
		const cartToken = cookieStore.get("cartToken")?.value;

		if (!cartToken) {
			throw new Error("Cart token not found");
		}
		// Find user cart by token
		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productVariant: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				token: cartToken,
			},
		});
		// If cart not found or total amount is 0, throw error
		if (!userCart) {
			throw new Error("Cart not found");
		}
		if (userCart?.totalAmount === 0) {
			throw new Error("Cart is empty");
		}

		// Create order in db
		const order = await prisma.order.create({
			data: {
				token: cartToken,
				fullName: `${data.firstName} ${data.lastName}`,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				status: OrderStatus.PENDING,
				totalAmount: userCart.totalAmount,
				items: JSON.stringify(userCart.items),
			},
		});

		// Update cart total amount to 0
		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		});
		// Delete all cart items
		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		});

		//! Create real payment (not mocked payment)
		const paymentData = await createPayment({
			amount: order.totalAmount,
			orderId: order.id,
			description: `Next Pizza order: ${order.id}`,
		});

		if (!paymentData) {
			throw new Error("Failed to create payment");
		}

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			},
		});

		const paymentUrl = paymentData.confirmation.confirmation_url;

		// Send link to payment service (like, Stripe, YouMoney, etc)
		await sendEmail(
			data.email,
			`Next Pizza / New order: ${order.id}`,
			PayOrderTemplate({
				orderId: order.id,
				totalAmount: order.totalAmount,
				paymentUrl,
			})
		);

		return paymentUrl;
	} catch (error) {
		console.log("[actions/createOrder] Server error", error);
	}
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession();

		if (!currentUser) {
			throw new Error("User not found");
		}

		const findUser = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id),
			},
		});

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				fullName: body.fullName,
				email: body.email,
				password: body.password
					? hashSync(body.password as string, 10)
					: findUser?.password,
			},
		});
	} catch (error) {
		console.log("Error [UPDATE_USER]", error);
		throw error;
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});

		if (user) {
			if (!user.verified) {
				throw new Error("Email hasn`t been verified");
			}

			throw new Error("User already exists");
		}

		const createdUser = await prisma.user.create({
			data: {
				email: body.email,
				fullName: body.fullName,
				password: hashSync(body.password as string, 10),
			},
		});

		const code = Math.floor(100000 + Math.random() * 900000).toString();

		await prisma.verificationCode.create({
			data: {
				code,
				userId: createdUser.id,
			},
		});

		await sendEmail(
			createdUser.email,
			`Next Pizza / Подтверждение регистрации`,
			VerificationUserTemplate({
				code,
			})
		);
	} catch (error) {
		console.log("Error [REGISTER_USER]", error);
		throw error;
	}
}
