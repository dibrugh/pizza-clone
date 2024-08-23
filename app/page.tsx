import {
	Container,
	Filters,
	ProductCard,
	ProductsGroupList,
	Title,
	TopBar,
} from "@/components/shared";

export default function Home() {
	return (
		<>
			<Container className="mt-10">
				<Title text="Все пиццы" size="lg" className="font-extrabold" />
			</Container>
			<TopBar />

			<Container className="mt-10 pb-14">
				<div className="flex gap-[80px]">
					{/* Filtration */}
					<div className="w-[250px]">
						<Filters />
					</div>

					{/* Catalog */}
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							<ProductsGroupList
								title="Пиццы"
								items={[
									{
										id: 1,
										name: "Пеперони",
										imageUrl: "",
										items: [{ price: 550 }],
										price: 550,
									},
									{
										id: 2,
										name: "Песто",
										imageUrl: "",
										items: [{ price: 550 }],
										price: 550,
									},
									{
										id: 3,
										name: "Барбекю",
										imageUrl: "",
										items: [{ price: 550 }],
										price: 550,
									},
									{
										id: 4,
										name: "Рандом",
										imageUrl: "",
										items: [{ price: 550 }],
										price: 550,
									},
								]}
								categoryId={1}
							/>

							<ProductsGroupList
								title="Комбо"
								items={[
									{
										id: 1,
										name: "Пеперони",
										imageUrl: "",
										items: [{ price: 550 }],
										price: 550,
									},
									{
										id: 2,
										name: "Песто",
										imageUrl: "",
										items: [{ price: 550 }],
										price: 550,
									},
									{
										id: 3,
										name: "Барбекю",
										imageUrl: "",
										items: [{ price: 550 }],
										price: 550,
									},
									{
										id: 4,
										name: "Рандом",
										imageUrl: "",
										items: [{ price: 550 }],
										price: 550,
									},
								]}
								categoryId={2}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
