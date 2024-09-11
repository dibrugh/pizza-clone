import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, FormLoginSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, Title } from "../../..";
import { Button } from "@/shared/components";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
	onClose?: VoidFunction;
};

export const LoginForm = ({ onClose }: Props) => {
	const form = useForm<FormLoginSchema>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: FormLoginSchema) => {
		try {
			const resp = await signIn("credentials", {
				...data,
				redirect: false,
			});

			if (!resp?.ok) {
				throw new Error("Не удалось войти в аккаунт");
			}

			toast.success("Вы вошли в аккаунт", {
				icon: "🥳",
			});
			onClose?.();
		} catch (error) {
			console.log("Error [LoginForm]: ", error);
			toast.error("Не удалось войти в аккаунт", {
				icon: "🥲",
			});
		}
	};
	return (
		<FormProvider {...form}>
			<form
				className="flex flex-col gap-5"
				onSubmit={form.handleSubmit(onSubmit)}
				autoComplete="off"
			>
				<div className="flex justify-between items-center">
					<div className="mr-2">
						<Title text="Вход в аккаунт" size="md" className="font-bold" />
						<p className="text-gray-400">
							Введите свою почту, чтобы войти в свой аккаунт
						</p>
					</div>
					<img
						src="/assets/images/phone-icon.png"
						alt="phone-icon"
						width={60}
						height={60}
					/>
				</div>

				<FormInput name="email" label="E-Mail" required />
				<FormInput name="password" label="Пароль" type="password" required />

				<Button
					loading={form.formState.isSubmitting}
					className="h-12 text-base"
					type="submit"
				>
					Войти
				</Button>
			</form>
		</FormProvider>
	);
};
