"use client";

import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store";
import { Category } from "@prisma/client";
import React from "react";

type Props = { items: Category[]; className?: string };

export const Categories = ({ items, className }: Props) => {
	const categoryActiveId = useCategoryStore((state) => state.activeId);
	return (
		<div
			className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
		>
			{items.map(({ name, id }, i) => (
				<a
					key={i}
					href={`/#${name}`}
					className={cn(
						"flex items-center font-bold h-11 rounded-2xl px-5",
						categoryActiveId === id &&
							"bg-white shadow-md shadow-gray-200 text-primary"
					)}
				>
					<button>{name}</button>
				</a>
			))}
		</div>
	);
};
