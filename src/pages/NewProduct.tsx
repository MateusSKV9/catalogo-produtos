import { useProduct } from "@/features/products";
import { SectionHeader } from "@/shared/components/SectionHeader/SectionHeader";
import { ProductForm } from "@/shared/components/Form/ProductForm/ProductForm";
import styles from "./Pages.module.css";

export default function NewProduct() {
	const { createProduct, isCreating } = useProduct();

	return (
		<section className={`${styles.section} ${styles.middle_width}`}>
			<SectionHeader title="Adicionando Produto" formId="product-form" isLoading={isCreating} />
			<ProductForm onSubmit={createProduct} />
		</section>
	);
}
