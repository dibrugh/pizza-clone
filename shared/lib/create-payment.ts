import { PaymentData } from "@/@types/payment";
import axios from "axios";

interface Props {
	description: string;
	orderId: number;
	amount: number;
}

const paymentUrl = "URL";

export async function createPayment(details: Props) {
	const { data } = await axios.post<PaymentData>(
		paymentUrl,
		{
			amount: {
				value: details.amount.toString(),
				currency: "USD",
			},
			capture: true,
			description: details.description,
			metadata: {
				order_id: details.orderId,
			},
			confirmation: {
				type: "redirect",
				return_url: "http://localhost:3000/?paid",
			},
		},
		{
			auth: {
				username: process.env.PAYMENT_API_KEY as string,
				password: process.env.PAYMENT_API_KEY as string,
			},
			headers: {
				"Content-Type": "application/json",
				"Idempotence-Key": Math.random().toString(36).substring(7),
			},
		}
	);

	return data;
}
