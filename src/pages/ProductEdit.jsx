import { useParams } from "react-router";
import { SectionHeader } from "../shared/components/SectionHeader/SectionHeader";
import { ProductForm } from "../shared/components/Form/ProductForm/ProductForm";
import { useProduct } from "../features/products/hooks/useProduct";
import { Loading } from "./../shared/components/Loading/Loading";
import styles from "./Pages.module.css";
import { useState } from "react";

export function ProductEdit() {
	const { id } = useParams();
	const { product, productsLoading, updateProduct } = useProduct(id);
	const [isLoading, setIsLoading] = useState(false);

	const handleUpdate = async () => {
		setIsLoading(true);
		try {
			await updateProduct(id);
		} catch (error) {
			console.error(error);
		}
		setIsLoading(false);
	};

	return (
		<section className={`${styles.section} ${styles.middle_width}`}>
			{productsLoading ? (
				<Loading />
			) : (
				<>
					<SectionHeader title={`Editando ${product.name}`} form="product-form" isLoading={isLoading} />
					<ProductForm onSubmit={handleUpdate} key={product?.id} productData={product} />
				</>
			)}
		</section>
	);
}
