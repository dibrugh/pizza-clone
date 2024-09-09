import { z } from "zod";

export const checkoutFormSchema = z.object({
	firstName: z.string().min(2, "Имя должно содержать не менее 2 символов"),
	lastName: z.string().min(2, "Фамилия должна содержать не менее 2 символов"),
	email: z.string().email("Введите корректную почту"),
	phone: z.string().min(10, "Введите корректный номер телефона"),
	address: z.string().min(5, "Введите корректный адрес доставки"),
	comment: z.string().optional(),
});

export type CheckoutFormSchema = z.infer<typeof checkoutFormSchema>;
