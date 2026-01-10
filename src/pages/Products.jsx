import styles from "./Pages.module.css";
import { ProductTable } from "../features/products/components/ProductTable/ProductTable";
// import { useState } from "react";
import { ProductHeader } from "../features/products/components/ProductHeader/ProductHeader";
import { useProduct } from "../features/products/hooks/useProduct";
import { Loading } from "../shared/components/Loading/Loading";
import { useSearchParams } from "react-router";

export function Products() {
	const { products, productsLoading, removeProduct } = useProduct();
	const [searchParams] = useSearchParams();
	const query = searchParams.get("search")?.toLowerCase() || "";

	const displayProducts = products.filter((product) => product.name.toLowerCase().includes(query));

	return (
		<section className={styles.section}>
			{productsLoading ? (
				<Loading />
			) : (
				<>
					<ProductHeader length={products.length} />

					{products.length > 0 ? (
						<ProductTable products={displayProducts} onDelete={removeProduct} />
					) : (
						<h1>Lista vazia [;-;]</h1>
					)}
				</>
			)}
		</section>
	);
}
