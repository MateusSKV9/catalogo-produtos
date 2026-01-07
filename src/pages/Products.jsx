import styles from "./Pages.module.css";
import { ProductTable } from "../features/products/components/ProductTable/ProductTable";
// import { useState } from "react";
import { ProductHeader } from "../features/products/components/ProductHeader/ProductHeader";
import { useProduct } from "../features/products/hooks/useProduct";

export function Products() {
	const { products, removeProduct } = useProduct();

	return (
		<section className={styles.section}>
			<ProductHeader length={products.length} />

			{products.length > 0 ? <ProductTable products={products} onDelete={removeProduct} /> : <h1>Lista vazia [;-;]</h1>}
		</section>
	);
}
