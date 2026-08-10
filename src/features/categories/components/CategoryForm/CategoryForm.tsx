import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input } from "@/shared";
import { CategoryDataSchema, type Category, type CategoryData } from "@/features/categories/schemas/category-schema";

type CategoryFormProps = {
	onSubmit: (data: any) => void;
	categoryData?: Category;
};

export function CategoryForm({ onSubmit, categoryData }: CategoryFormProps) {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<CategoryData>({ resolver: zodResolver(CategoryDataSchema), defaultValues: categoryData || {} });

	useEffect(() => {
		reset(categoryData || {});
	}, [categoryData, reset]);

	const handleOnSubmit = (data: CategoryData) => {
		try {
			const newId = crypto.randomUUID();

			const playLoad = categoryData?.id ? { ...data, id: categoryData.id } : { ...data, id: newId };
			onSubmit(playLoad);
		} catch (error) {
			alert(error);
		}
		reset();
	};

	return (
		<Form id="category-form" onSubmit={handleSubmit(handleOnSubmit)}>
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
