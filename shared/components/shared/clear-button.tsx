import { X } from "lucide-react";

type Props = {
	onClick?: VoidFunction;
	className?: string;
};

export const ClearButton = ({ onClick, className }: Props) => {
	return (
		<button
			onClick={onClick}
			className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer"
		>
			<X className="w-5 h-5" />
		</button>
	);
};
