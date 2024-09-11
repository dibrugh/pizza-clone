"use client";

import { cn } from "@/shared/lib/utils";
import { useEffect, useState } from "react";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals";

type Props = { hasSearch?: boolean; hasCart?: boolean; className?: string };

export const Header = ({
	hasSearch = true,
	hasCart = true,
	className,
}: Props) => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [openAuthModal, setOpenAuthModal] = useState(false);

	useEffect(() => {
		let toastMessage = "";

		if (searchParams.has("paid")) {
			toastMessage = "Заказ успешно оплачен! Информация отправлена на почту.";
		}

		if (searchParams.has("verified")) {
			toastMessage = "Почта успешно подтверждена!";
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace("/");
				toast.success(toastMessage, {
					duration: 3000,
				});
			}, 1000);
		}
	}, []);
	return (
		<header className={cn(" border-b", className)}>
			<Container className="flex items-center justify-between py-8">
				{/* Left side */}
				<Link href={"/"}>
					<div className="flex items-center gap-4">
						<Image src={"/logo.png"} alt="Logo" width={35} height={35} />
						<div>
							<h1 className="text-2xl uppercase font-black">Next pizza</h1>
							<p className="text-sm text-gray-400 leading-3">
								вкусней уже некуда
							</p>
						</div>
					</div>
				</Link>

				{hasSearch && (
					<div className="mx-10 flex-1">
						<SearchInput />
					</div>
				)}

				{/* Right side */}
				<div className="flex items-center gap-4">
					<AuthModal
						open={openAuthModal}
						onClose={() => setOpenAuthModal(false)}
					/>
					<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	);
};
