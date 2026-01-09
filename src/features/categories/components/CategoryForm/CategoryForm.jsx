import { useEffect, useState } from "react";
import { Form } from "../../../../shared/components/Form/Form/Form";
import { Input } from "../../../../shared/components/Form/Input/Input";

export function CategoryForm({ handleSubmit, categoryData }) {
	const [category, setCategory] = useState(categoryData);

	// Essencial: Atualiza o estado interno quando a prop mudar
	useEffect(() => {
		setCategory(categoryData);
	}, [categoryData]);

	const handleCategory = (e) => {
		e.preventDefault();
		handleSubmit(category);
		setCategory({}); // Limpa após envio
	};

	const handleChange = (e) => {
		setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<Form id="category-form" handleOnSubmit={handleCategory}>
			<Input
				handleChange={handleChange}
				value={category?.name || ""}
				id="name"
				label="Categoria"
				name="name"
				placeholder="Digite o nome da categoria"
			/>
		</Form>
	);
}
