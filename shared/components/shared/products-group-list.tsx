"use client";

import React, { useEffect, useRef } from "react";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
import { ProductCard } from "./product-card";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/shared/store";

type Props = {
	title: string;
	items: any;
	categoryId: number;
	listClassName?: string;
	className?: string;
};

export const ProductsGroupList = ({
	title,
	items,
	className,
	listClassName,
	categoryId,
}: Props) => {
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
	const IntersectionRef = useRef(null);
	const intersection = useIntersection(IntersectionRef, {
		threshold: 0.4,
	});

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
	}, [intersection?.isIntersecting, setActiveCategoryId, categoryId]);
	return (
		<div className={className} id={title} ref={IntersectionRef}>
			<Title text={title} size="lg" className="font-extrabold mb-5" />

			<div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
				{items.map((product: any) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						imageUrl={product.imageUrl}
						price={product.variants[0].price}
					/>
				))}
			</div>
		</div>
	);
};
