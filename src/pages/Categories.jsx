import { useState } from "react";
import { Category } from "../features/categories/components/Category/Category";
import { CategoryForm } from "../features/categories/components/CategoryForm/CategoryForm";
import { useCategory } from "../features/categories/hooks/useCategory";
import { Loading } from "../shared/components/Loading/Loading";
import { SectionHeader } from "../shared/components/SectionHeader/SectionHeader";
import styles from "./Pages.module.css";

export function Categories() {
	const {
		categories,
		categoriesLoading,
		selectedCategory,
		addCategory,
		update,
		remove,
		getCategoryById,
		clearSelection,
	} = useCategory();

	const isEditing = !!selectedCategory;

	const [saving, setSaving] = useState(false);

	const handleSave = async (data) => {
		setSaving(true);
		if (isEditing) {
			await update(data);
			clearSelection();
		} else {
			await addCategory(data);
		}
		setSaving(false);
	};

	return (
		<section className={`${styles.section} ${styles.middle_width}`}>
			{categoriesLoading ? (
				<Loading />
			) : (
				<>
					<h1 className={styles.title}>Categorias</h1>
					<ul className={styles.container_categories}>
						{categories.map((cat) => (
							<Category key={cat.id} id={cat.id} name={cat.name} setToEdit={getCategoryById} handleRemove={remove} />
						))}
					</ul>
					<SectionHeader
						title={isEditing ? "Editando Categoria" : "Adicionar categoria"}
						isEditing={isEditing}
						form="category-form"
            clearSelection={clearSelection}
						isLoading={saving}
					/>

					<CategoryForm categoryData={selectedCategory || {}} onSubmit={handleSave} />
				</>
			)}
		</section>
	);
}
