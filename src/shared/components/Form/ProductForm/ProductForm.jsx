import { useState } from "react";
import { useCategories } from "../../../../features/products/hooks/useCategories";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import styles from "./ProductForm.module.css";
import { useNavigate } from "react-router";

export function ProductForm({ onSubmit, productData }) {
	const categories = useCategories();

	const [product, setProduct] = useState(productData || {});

	const navigate = useNavigate();

	const handleOnSubmit = (e) => {
		e.preventDefault();
		onSubmit(product);
		navigate("/");
	};

	const handleChange = (e) => {
		setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleCategory = (e) => {
		setProduct((prev) => ({
			...prev,
			category: {
				id: e.target.value,
				name: e.target.options[e.target.selectedIndex].text,
			},
		}));
	};

	return (
		<form id="product-form" onSubmit={handleOnSubmit} className={styles.form}>
			<Input
				label="Nome"
				name="name"
				id="name"
				value={product?.name || ""}
				placeholder="Digite o nome do produto"
				handleChange={handleChange}
			/>
			<div className={styles.wrapper}>
				<Input
					label="Valor (R$)"
					name="value"
					id="value"
					value={product?.value || ""}
					handleChange={handleChange}
					placeholder="Digite o valor do produto"
				/>
				<Select
					label="Categoria"
					value={product?.category ? product.category.id : ""}
					id={product?.category?.id}
					options={categories}
					handleCategory={handleCategory}
				/>
			</div>
		</form>
	);
}
