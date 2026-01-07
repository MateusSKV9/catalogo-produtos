import styles from "./Pages.module.css";
import { ProductTable } from "../features/products/components/ProductTable/ProductTable";
// import { useState } from "react";
import { ProductHeader } from "../features/products/components/ProductHeader/ProductHeader";
import { useProduct } from "../features/products/hooks/useProduct";
import { Loading } from "../shared/components/Loading/Loading";

export function Products() {
	const { products, loading, removeProduct } = useProduct();

	return (
		<section className={styles.section}>
			{loading ? (
				<Loading />
			) : (
				<>
					<ProductHeader length={products.length} />

					{products.length > 0 ? (
						<ProductTable products={products} onDelete={removeProduct} />
					) : (
						<h1>Lista vazia [;-;]</h1>
					)}
				</>
			)}
		</section>
	);
}
