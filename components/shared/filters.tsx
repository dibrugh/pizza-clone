import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";

type Props = { className?: string };

export const Filters = ({ className }: Props) => {
	return (
		<div className={className}>
			<Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

			{/* Filters checkboxes */}
			<div className="flex flex-col gap-4">
				<FilterCheckbox text="Можно собирать" value="1" />
				<FilterCheckbox text="Новинки" value="2" />
			</div>
			{/* Price */}
			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex mb-5 gap-3">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={1000}
						defaultValue={0}
					/>
					<Input type="number" placeholder="1000" min={100} max={1000} />
				</div>

				<RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
			</div>

			{/* Ingredients */}
			<CheckboxFiltersGroup
				title="Ингредиенты"
				className="mt-5"
				items={[
					{
						text: "Мясо",
						value: "1",
					},
					{
						text: "Рыба",
						value: "2",
					},
					{
						text: "Овощи",
						value: "3",
					},
					{
						text: "Мясо",
						value: "1",
					},
					{
						text: "Рыба",
						value: "2",
					},
					{
						text: "Овощи",
						value: "3",
					},
					{
						text: "Мясо",
						value: "1",
					},
					{
						text: "Рыба",
						value: "2",
					},
					{
						text: "Овощи",
						value: "3",
					},
				]}
				defaultItems={[
					{
						text: "Мясо",
						value: "1",
					},
					{
						text: "Рыба",
						value: "2",
					},
					{
						text: "Овощи",
						value: "3",
					},
				]}
				limit={6}
			/>
		</div>
	);
};
