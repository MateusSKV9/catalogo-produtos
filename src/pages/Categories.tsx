import { useSearchParams } from "react-router-dom";
import { useCategory, CategoryForm, CategoryCard, type Category } from "@/features/categories";
import { Loading, SectionHeader } from "@/shared";
import styles from "./Pages.module.css";

export default function Categories() {
	const [searchParams, setSearchParams] = useSearchParams({});
	const id = searchParams.get("id") || undefined;
	const clearSelection = () => setSearchParams({});

	const { categories, isLoading, isFetching, category, createCategory, deleteCategory, updateCategory } =
		useCategory(id);

	const isEditing = !!category;

	const handleSave = async (data: Category) => {
		if (isEditing) {
			await updateCategory(data);
			clearSelection();
		} else {
			await createCategory(data);
		}
	};

	if (isLoading) return <Loading />;

	return (
		<section className={`${styles.section} ${styles.middle_width}`}>
			<h1 className={styles.title}>Categorias</h1>
			<ul className={styles.container_categories}>
				{categories.map((cat) => (
					<CategoryCard
						key={cat.id}
						id={cat.id}
						name={cat.name}
						setToEdit={() => {
							setSearchParams({ id: cat.id });
						}}
						handleRemove={deleteCategory}
					/>
				))}
			</ul>
			{isFetching && <span>Atualizando...</span>}
			<SectionHeader
				title={isEditing ? "Editando Categoria" : "Adicionar categoria"}
				isEditing={isEditing}
				formId="category-form"
				clearSelection={clearSelection}
				isLoading={isFetching}
			/>

			<CategoryForm key={category?.id || "new"} categoryData={category} onSubmit={handleSave} />
		</section>
	);
}
