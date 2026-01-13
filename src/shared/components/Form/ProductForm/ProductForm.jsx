import { useState } from "react";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import styles from "./ProductForm.module.css";
import { useNavigate } from "react-router";
import { Form } from "../Form/Form";
import { useCategory } from "../../../../features/categories/hooks/useCategory";

export function ProductForm({ onSubmit, productData }) {
	const { categories } = useCategory();
	const [product, setProduct] = useState(productData || {});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		if (isSubmitting) return;

		setIsSubmitting(true);
		try {
			await onSubmit(product);
			navigate("/");
		} catch (error) {
			console.error(error);
		}
		setIsSubmitting(false);
	};

	const handleChange = (e) => {
		setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleCategory = (e) => {
		setProduct((prev) => ({
			...prev,
			categoryId: e.target.value,
		}));
	};

	return (
		<Form id="product-form" handleOnSubmit={handleOnSubmit} className={styles.form}>
			<Input
				label="Nome"
				name="name"
				id="name"
				type="text"
				value={product?.name || ""}
				placeholder="Digite o nome do produto"
				handleChange={handleChange}
			/>
			<div className={styles.wrapper}>
				<Input
					label="Valor (R$)"
					name="value"
					id="value"
					type="number"
					value={product?.value || ""}
					handleChange={handleChange}
					placeholder="Digite o valor do produto"
				/>
				<Select
					label="Categoria"
					value={product?.categoryId ? product.categoryId : ""}
					id={product?.categoryId}
					options={categories}
					handleCategory={handleCategory}
				/>
			</div>
		</Form>
	);
}
