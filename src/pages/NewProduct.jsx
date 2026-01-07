import styles from "./Pages.module.css";
import { ProductForm } from "../shared/components/Form/ProductForm/ProductForm";
import { SectionHeader } from "../shared/components/SectionHeader/SectionHeader";
import { useProduct } from "../features/products/hooks/useProduct";

export function NewProduct() {
	const { addProduct } = useProduct();

	return (
		<section className={styles.section}>
			<SectionHeader title="Adicionando Produto" />
			<ProductForm onSubmit={addProduct} />
		</section>
	);
}
