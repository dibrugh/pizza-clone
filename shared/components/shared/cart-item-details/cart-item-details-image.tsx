import { cn } from "@/shared/lib/utils";

type Props = {
	src: string;
	className?: string;
};

export const CartItemDetailsImage = ({ src, className }: Props) => {
	return <img className={cn("w-[60px] h-[60px]", className)} src={src} />;
};
