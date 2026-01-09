// import { useState } from "react";
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

	// Se existe uma categoria selecionada, estamos editando
	const isEditing = !!selectedCategory;

	const handleEditClick = (id) => {
		getCategoryById(id);
	};

	const handleSave = async (data) => {
		if (isEditing) {
			await update(data);
			clearSelection();
		} else {
			await addCategory(data);
		}
	};

	return (
		<section className={`${styles.section} ${styles.middle_width}`}>
			{categoriesLoading ? (
				<Loading />
			) : (
				<>
					<h2 className={styles.title}>Categorias</h2>
					<ul className={styles.container_categories}>
						{categories.map((cat) => (
							<Category
								key={cat.id}
								id={cat.id}
								name={cat.name}
								setToEdit={() => handleEditClick(cat.id)} // Passa o ID para buscar
								handleRemove={remove}
							/>
						))}
					</ul>
					<SectionHeader title={isEditing ? "Editando Categoria" : "Adicionar categoria"} form="category-form" />

					<CategoryForm categoryData={selectedCategory || {}} handleSubmit={handleSave} />
				</>
			)}
		</section>
	);
}
