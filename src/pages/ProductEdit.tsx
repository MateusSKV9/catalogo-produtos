import { useParams } from "react-router-dom";
import { useProduct } from "@/features/products";
import { useLoading } from "@/hooks";
import { Loading } from "@/shared/components/Loading/Loading";
import { SectionHeader } from "@/shared/components/SectionHeader/SectionHeader";
import { ProductForm } from "@/shared/components/Form/ProductForm/ProductForm";
import styles from "./Pages.module.css";

export default function ProductEdit() {
	const { id } = useParams();
	const { product, updateProduct } = useProduct(id);
	const { isLoading, run } = useLoading();

	const handleUpdate = (dataFromForm: any) => {
		return run(() => updateProduct({ ...dataFromForm, id }));
	};

	if (!product) return <Loading />;

	return (
		<section className={`${styles.section} ${styles.middle_width}`}>
			<SectionHeader title={`Editando ${product?.name}`} formId="product-form" isLoading={isLoading} />

			<ProductForm onSubmit={handleUpdate} key={product?.id} productData={product} />
		</section>
	);
}
