import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import styles from "./ProductForm.module.css";
import { useNavigate } from "react-router";
import { Form } from "../Form/Form";
import { useCategory } from "../../../../features/categories/hooks/useCategory";

import { useForm } from "react-hook-form";

export function ProductForm({ onSubmit, productData }) {
	const { categories } = useCategory();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: productData || {} });

	const handleOnSubmit = async (data) => {
		try {
			await onSubmit(data);
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
				{...register("name", { required: "Nome é obrigatório" })}
			/>
			<div className={styles.wrapper}>
				<Input
					id="value"
					label="Valor (R$)"
					type="number"
					step={"0.01"}
					placeholder="Digite o valor do produto"
					error={errors.value?.message}
					{...register("value", {
						required: "Valor é obrigatório",
						valueAsNumber: true,
						min: { value: 0, message: "O valor deve ser no mínimo 0." },
					})}
				/>
				<Select label="Categoria" options={categories} {...register("categoryId")} />
			</div>
		</Form>
	);
}
