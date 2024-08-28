"use client";

import { cn } from "@/lib/utils";
import React from "react";

type Variant = {
	name: string;
	value: string;
	disabled?: boolean;
};

type Props = {
	variants: readonly Variant[];
	onClick?: (value: Variant["value"]) => void;
	selectedValue?: Variant["value"];
	className?: string;
};

export const GroupVariants = ({
	variants,
	onClick,
	selectedValue,
	className,
}: Props) => {
	return (
		<div
			className={cn(
				className,
				"flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none"
			)}
		>
			{variants.map((variant) => (
				<button
					key={variant.name}
					onClick={() => onClick?.(variant.value)}
					className={cn(
						"flex items-center justify-center h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm",
						{
							"bg-white shadow": variant.value === selectedValue,
							"text-gray-500 opacity-50 pointer-events-none": variant.disabled,
						}
					)}
				>
					{variant.name}
				</button>
			))}
		</div>
	);
};
