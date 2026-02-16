import styles from "./Pages.module.css";
import { ProductTable } from "../features/products/components/ProductTable/ProductTable";
import { ProductHeader } from "../features/products/components/ProductHeader/ProductHeader";
import { useProduct } from "../features/products/hooks/useProduct";
import { Loading } from "../shared/components/Loading/Loading";
import { useSearchParams } from "react-router";
import { useCategory } from "../features/categories/hooks/useCategory";

export function Products() {
	const { products, productsLoading, removeProduct } = useProduct();
	const { categoriesLoading } = useCategory();
	const [searchParams] = useSearchParams();
	const queryProducts = searchParams.get("search")?.toLowerCase() || "";
	const filterByCategory = searchParams.get("category") || "";

	const displayProducts = filterByCategory
		? products.filter((product) => product.categoryId === filterByCategory)
		: products.filter((product) => product.name.toLowerCase().includes(queryProducts));

	const uniqueCategoriesCount = new Set(displayProducts.map((product) => product.categoryId)).size;

	return (
		<section className={styles.section}>
			{productsLoading || categoriesLoading ? (
				<Loading />
			) : (
				<>
					<ProductHeader quantityProducts={displayProducts.length} quantityCategories={uniqueCategoriesCount} />

					{products.length > 0 ? (
						<ProductTable products={displayProducts} onDelete={removeProduct} />
					) : (
						<h2 className={styles.empty_list}>Lista vazia [;-;]</h2>
					)}
				</>
			)}
		</section>
	);
}
