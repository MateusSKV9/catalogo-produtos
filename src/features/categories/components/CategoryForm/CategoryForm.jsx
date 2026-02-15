import { useEffect } from "react";
import { Form } from "../../../../shared/components/Form/Form/Form";
import { Input } from "../../../../shared/components/Form/Input/Input";
import { useForm } from "react-hook-form";

export function CategoryForm({ onSubmit, categoryData }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({ defaultValues: categoryData || {} });

	useEffect(() => {
		reset(categoryData || {});
	}, [categoryData, reset]);

	const handleOnSubmit = (data) => {
		onSubmit(data);
		reset();
	};

	return (
		<Form id="category-form" handleOnSubmit={handleSubmit(handleOnSubmit)}>
			<Input
				id="name"
				label="Categoria"
				error={errors.name?.message}
				placeholder="Digite o nome da categoria"
				{...register("name", { required: "Nome é obrigatório!" })}
			/>
		</Form>
	);
}
