import styles from "./Pages.module.css";
import { ProductTable } from "../features/products/components/ProductTable/ProductTable";
import { ProductHeader } from "../features/products/components/ProductHeader/ProductHeader";
import { useProduct } from "../features/products/hooks/useProduct";
import { Loading } from "../shared/components/Loading/Loading";
import { useSearchParams } from "react-router";
import { useCategory } from "../features/categories/hooks/useCategory";
import { useMemo } from "react";

export function Products() {
	const { products, isLoading, isCreating, isUpdating, deleteProduct } = useProduct();
	const { categoriesLoading } = useCategory();
	const [searchParams] = useSearchParams();
	const queryProducts = searchParams.get("search")?.toLowerCase() || "";
	const filterByCategory = searchParams.get("category") || "";

	const displayProducts = useMemo(() => {
		return filterByCategory
			? products.filter((product) => product.categoryId === filterByCategory)
			: products.filter((product) => product.name.toLowerCase().includes(queryProducts));
	}, [filterByCategory, queryProducts, products]);

	const uniqueCategoriesCount = new Set(displayProducts.map((product) => product.categoryId)).size;

	if (isLoading || categoriesLoading) return <Loading />;

	return (
		<section className={styles.section}>
			<ProductHeader quantityProducts={displayProducts.length} quantityCategories={uniqueCategoriesCount} />
			{displayProducts.length > 0 ? (
				<>
					<ProductTable products={displayProducts} onDelete={deleteProduct} />
					{(isCreating || isUpdating) && <span>Atualizando...</span>}
				</>
			) : (
				<h2 className={styles.empty_list}>Lista vazia [;-;]</h2>
			)}
		</section>
	);
}
