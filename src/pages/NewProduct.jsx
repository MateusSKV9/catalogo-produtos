import styles from "./Pages.module.css";
import { ProductForm } from "../shared/components/Form/ProductForm/ProductForm";
import { SectionHeader } from "../shared/components/SectionHeader/SectionHeader";
import { useProduct } from "../features/products/hooks/useProduct";

export function NewProduct() {
	const { createProduct, isCreating } = useProduct();

	

	return (
		<section className={`${styles.section} ${styles.middle_width}`}>
			<SectionHeader title="Adicionando Produto" form="product-form" isLoading={isCreating} />
			<ProductForm onSubmit={createProduct} />
		</section>
	);
}
