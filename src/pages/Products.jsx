import { ProductTable } from "../features/products/components/ProductTable";

const products = [
	{ id: crypto.randomUUID(), name: "Arroz", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Feijão", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Macarrão", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Farinha", category: "Alimentos", value: 29.99 },
];

export function Products() {
	return (
		<section>
			<h1>Products</h1>

			<ProductTable products={products} />
		</section>
	);
}
