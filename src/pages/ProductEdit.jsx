import { useParams } from "react-router";
import { SectionHeader } from "../shared/components/SectionHeader/SectionHeader";
import { ProductForm } from "../shared/components/Form/ProductForm/ProductForm";
import { useEffect, useState } from "react";
import { useProduct } from "../features/products/hooks/useProduct";
import { Loading } from "./../shared/components/Loading/Loading";
import styles from "./Pages.module.css";

export function ProductEdit() {
	const { loadProduct, loading, updateProduct } = useProduct();

	const [product, setProduct] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchProduct = async () => {
			const data = await loadProduct(id);
			setProduct(data);
		};

		if (id) fetchProduct();
	}, [id, loadProduct]);

	return (
		<section className={styles.section}>
			{loading || !product ? (
				<Loading />
			) : (
				<>
					<SectionHeader title={`Editando ${product.name}`} form="product-form" />
					<ProductForm onSubmit={updateProduct} key={product?.id} productData={product} />
				</>
			)}
		</section>
	);
}
