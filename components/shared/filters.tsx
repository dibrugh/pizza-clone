"use client";

import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useEffect, useState } from "react";
import { useSet } from "react-use";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";

type Props = { className?: string };

type PriceRange = {
	priceFrom?: number;
	priceTo?: number;
};

type QueryFilters = {
	pizzaVariants: string[];
	sizes: string;
	ingredients: string[];
} & PriceRange;

export const Filters = ({ className }: Props) => {
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFilters,
		string
	>;
	const router = useRouter();
	const { ingredients, loading, onToggle, selectedIngredients } =
		useFilterIngredients();

	const [prices, setPrices] = useState<PriceRange>({
		priceFrom: Number(searchParams.has("priceFrom")) || undefined,
		priceTo: Number(searchParams.has("priceTo")) || undefined,
	});

	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(
			searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
		)
	);
	const [pizzaVariants, { toggle: togglePizzaVariants }] = useSet(
		new Set<string>(
			searchParams.has("pizzaVariants")
				? searchParams.get("pizzaVariants")?.split(",")
				: []
		)
	);

	const items = ingredients.map((ingredient) => ({
		value: String(ingredient.id),
		text: ingredient.name,
	}));

	const updatePrice = (name: keyof PriceRange, value: number) => {
		setPrices({ ...prices, [name]: value });
	};

	useEffect(() => {
		const filters = {
			...prices,
			pizzaVariants: Array.from(pizzaVariants),
			sizes: Array.from(sizes),
			ingredients: Array.from(selectedIngredients),
		};

		const query = qs.stringify(filters, {
			arrayFormat: "comma",
		});

		router.push(`?${query}`, { scroll: false });
	}, [prices, pizzaVariants, sizes, selectedIngredients, router]);

	return (
		<div className={className}>
			<Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

			{/* Filters checkboxes */}
			<CheckboxFiltersGroup
				title="Тип теста"
				name="pizzaVariants"
				className="mb-5"
				onClickCheckbox={togglePizzaVariants}
				selected={pizzaVariants}
				items={[
					{ text: "Тонкое", value: "1" },
					{ text: "Традиционное", value: "2" },
				]}
			/>

			<CheckboxFiltersGroup
				title="Размеры"
				name="sizes"
				className="mb-5"
				onClickCheckbox={toggleSizes}
				selected={sizes}
				items={[
					{ text: "20 см", value: "20" },
					{ text: "30 см", value: "30" },
					{ text: "40 см", value: "40" },
				]}
			/>
			{/* Price */}
			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex mb-5 gap-3">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={1000}
						value={String(prices.priceFrom)}
						onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
					/>
					<Input
						type="number"
						placeholder="1000"
						min={100}
						max={1000}
						value={String(prices.priceTo)}
						onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
					/>
				</div>

				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[prices.priceFrom || 0, prices.priceTo || 1000]}
					onValueChange={([priceFrom, priceTo]) =>
						setPrices({ priceFrom, priceTo })
					}
				/>
			</div>

			{/* Ingredients */}
			<CheckboxFiltersGroup
				title="Ингредиенты"
				name="ingredients"
				className="mt-5"
				items={items}
				defaultItems={items.slice(0, 6)}
				limit={6}
				loading={loading}
				onClickCheckbox={onToggle}
				selected={selectedIngredients}
			/>
		</div>
	);
};
