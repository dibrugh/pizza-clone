import { User, Link, CircleUser } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "../ui";

type Props = {
	onClickSignIn?: () => void;
	className?: string;
};

export const ProfileButton = ({ onClickSignIn, className }: Props) => {
	const { data: session } = useSession();

	return (
		<div className={className}>
			{!session ? (
				<Button
					onClick={onClickSignIn}
					variant="outline"
					className="flex items-center gap-1"
				>
					<User size={16} />
					Войти
				</Button>
			) : (
				<Link href="/profile">
					<Button variant="secondary" className="flex items-center gap-2">
						<CircleUser size={18} />
						Профиль
					</Button>
				</Link>
			)}
		</div>
	);
};
