import styles from "./Pages.module.css";
import { ProductTable } from "../features/products/components/ProductTable";
import { useState } from "react";

const productsInitial = [
	{ id: crypto.randomUUID(), name: "Arroz", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Feijão", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Macarrão", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Farinha", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Farinha", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Farinha", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Farinha", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Farinha", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Farinha", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Farinha", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Farinha", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Farinha", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Farinha", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Farinha", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Farinha", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Farinha", category: "Alimentos", value: 29.99 },
	{ id: crypto.randomUUID(), name: "Farinha", category: "Alimentos", value: 29.99 },
];

export function Products() {
	const [products, setProducts] = useState(productsInitial);

	const heandleDeleteProducts = (id) => setProducts((prev) => prev.filter((product) => product.id !== id));

	return (
		<section className={styles.section}>
			<h1>Products</h1>

			<ProductTable products={products} onDelete={heandleDeleteProducts} />
		</section>
	);
}
