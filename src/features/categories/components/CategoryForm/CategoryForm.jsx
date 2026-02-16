import { useEffect } from "react";
import { Form } from "../../../../shared/components/Form/Form/Form";
import { Input } from "../../../../shared/components/Form/Input/Input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CategorySchema = z.object({ name: z.string().min(1, "Nome é obrigatório") });

export function CategoryForm({ onSubmit, categoryData }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({ resolver: zodResolver(CategorySchema), defaultValues: categoryData || {} });

	useEffect(() => {
		reset(categoryData || {});
	}, [categoryData, reset]);

	const handleOnSubmit = (data) => {
		try {
			const playLoad = categoryData.id ? { id: categoryData.id, ...data } : data;
			onSubmit(playLoad);
		} catch (error) {
			alert(error);
		}
		reset();
	};

	return (
		<Form id="category-form" handleOnSubmit={handleSubmit(handleOnSubmit)}>
			<Input
				id="name"
				label="Categoria"
				error={errors.name?.message}
				placeholder="Digite o nome da categoria"
				{...register("name")}
			/>
		</Form>
	);
}
