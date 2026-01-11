import styles from "./Pages.module.css";
import { ProductForm } from "../shared/components/Form/ProductForm/ProductForm";
import { SectionHeader } from "../shared/components/SectionHeader/SectionHeader";
import { useProduct } from "../features/products/hooks/useProduct";
import { useState } from "react";

export function NewProduct() {
	const { addProduct } = useProduct();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (data) => {
		setLoading(true);
		await addProduct(data);
		setLoading(false);
	};

	return (
		<section className={`${styles.section} ${styles.middle_width}`}>
			<SectionHeader title="Adicionando Produto" form="product-form" isLoading={loading} />
			<ProductForm onSubmit={handleSubmit} />
		</section>
	);
}
