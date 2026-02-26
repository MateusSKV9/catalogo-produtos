import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import styles from "./ProductForm.module.css";
import { Form } from "../Form/Form";
import { useCategory } from "../../../../features/categories/hooks/useCategory";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../../../schemas/productSchema";
import { useNavigate } from "react-router-dom";

export function ProductForm({ onSubmit, productData }) {
	const { categories } = useCategory();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(productSchema),
		defaultValues: productData ? { ...productData, value: String(productData.value) } : {},
	});

	const handleOnSubmit = async (data) => {
		try {
			const playLoad = productData?.id ? { id: productData.id, ...data } : { id: crypto.randomUUID(), ...data };
			await onSubmit(playLoad);
			navigate("/");
		} catch (error) {
			alert(error.message || "Erro ao salvar produtos.");
		}
	};

	return (
		<Form id="product-form" handleOnSubmit={handleSubmit(handleOnSubmit)} className={styles.form}>
			<Input
				id="name"
				label="Nome"
				type="text"
				placeholder="Digite o nome do produto"
				error={errors.name?.message}
				{...register("name")}
			/>
			<div className={styles.wrapper}>
				<Input
					id="value"
					label="Valor (R$)"
					type="number"
					step={"0.01"}
					placeholder="Digite o valor do produto"
					error={errors.value?.message}
					{...register("value")}
				/>
				<Select label="Categoria" options={categories} {...register("categoryId")} />
			</div>
		</Form>
	);
}
