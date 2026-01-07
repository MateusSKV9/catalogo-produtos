import { useCategories } from "../../../../features/products/hooks/useCategories";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";

export function ProductForm() {
	const categories = useCategories();

	return (
		<form>
			<Input label="Nome" name="name" id="name" />
			<Input label="Valor" name="value" id="value" />
			<Select label="Categoria" options={categories} />
		</form>
	);
}
