import { CategoryForm } from "../features/categories/components/CategoryForm/CategoryForm";
import { useCategory } from "../features/categories/hooks/useCategory";
import { SectionHeader } from "../shared/components/SectionHeader/SectionHeader";
import styles from "./Pages.module.css";

export function Categories() {
	const { categories, addCategory } = useCategory();

	return (
		<section className={styles.section}>
			<h2>Categorias</h2>

			<ul>
				{categories.map((category) => (
					<li key={category.id}>{category.name}</li>
				))}
			</ul>

			<SectionHeader title="Adicionar categoria" form="category-form" />
			<CategoryForm handleSubmit={addCategory} />
		</section>
	);
}
