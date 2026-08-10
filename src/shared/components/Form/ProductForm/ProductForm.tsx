import { Form } from "../Form/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useCategory } from "@/features/categories";
import { Input } from "@/shared/components/Form/Input/Input";
import { ProductDataSchema, type Product, type ProductData, type ProductDataInput } from "@/features/products";
import { Select } from "@/shared/components/Form/Select/Select";
import styles from "./ProductForm.module.css";

type ProductFormProps = {
	onSubmit: (data: ProductData | Product) => Promise<unknown> | void;
	productData?: Product;
};

export function ProductForm({ onSubmit, productData }: ProductFormProps) {
	const { categories } = useCategory();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProductDataInput, any, ProductData>({
		resolver: zodResolver(ProductDataSchema),
		defaultValues: productData
			? { name: productData.name, value: productData.value, categoryId: productData.categoryId }
			: {},
	});

	const handleOnSubmit = async (data: ProductData) => {
		try {
			const newId = crypto.randomUUID();

			const payload = productData?.id ? { ...data } : { ...data, id: newId };
			await onSubmit(payload);
			navigate("/");
		} catch (error) {
			const message = error instanceof Error ? error.message : "Erro ao salvar produto.";
			alert(message);
		}
	};

	return (
		<Form id="product-form" onSubmit={handleSubmit(handleOnSubmit)}>
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
					step="0.01"
					placeholder="Digite o valor do produto"
					error={errors.value?.message}
					{...register("value", { valueAsNumber: true })}
				/>
				<Select label="Categoria" options={categories} {...register("categoryId")} />
			</div>
		</Form>
	);
}
