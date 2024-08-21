import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

interface Props {
	className?: string;
}

export const Container = ({
	className,
	children,
}: PropsWithChildren<Props>) => {
	return (
		<div className={cn("mx-auto max-w-[1280px]", className)}>{children}</div>
	);
};
