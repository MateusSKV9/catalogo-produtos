import { useCategories } from "../../../../features/products/hooks/useCategories";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import styles from "./ProductForm.module.css";

export function ProductForm() {
	const categories = useCategories();

	return (
		<form className={styles.form}>
			<Input label="Nome" name="name" id="name" placeholder="Digite o nome do produto" />
			<div className={styles.wrapper}>
				<Input label="Valor (R$)" name="value" id="value" placeholder="Digite o valor do produto" />
				<Select label="Categoria" options={categories} />
			</div>
		</form>
	);
}
