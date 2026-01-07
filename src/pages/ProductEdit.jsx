import { useParams } from "react-router";
import { SectionHeader } from "../shared/components/SectionHeader/SectionHeader";
import { ProductForm } from "../shared/components/Form/ProductForm/ProductForm";
import { useEffect, useState } from "react";
import { useProduct } from "../features/products/hooks/useProduct";
import { Loading } from "./../shared/components/Loading/Loading";

export function ProductEdit() {
	const { loadProduct, loading, updateProduct } = useProduct();

	const [product, setProduct] = useState(null); // Inicie como null
	const { id } = useParams();

	useEffect(() => {
		const fetchProduct = async () => {
			const data = await loadProduct(id);
			setProduct(data);
		};

		if (id) fetchProduct();
	}, [id, loadProduct]);

	return (
		<section>
			{loading || !product ? (
				<Loading />
			) : (
				<>
					<SectionHeader title="Editando produto" />
					<ProductForm onSubmit={updateProduct} key={product?.id} productData={product} />
				</>
			)}
		</section>
	);
}
