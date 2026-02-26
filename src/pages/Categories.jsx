import { useSearchParams } from "react-router-dom";
import { Category } from "../features/categories/components/Category/Category";
import { CategoryForm } from "../features/categories/components/CategoryForm/CategoryForm";
import { useCategory } from "../features/categories/hooks/useCategory";
import { Loading } from "../shared/components/Loading/Loading";
import { SectionHeader } from "../shared/components/SectionHeader/SectionHeader";
import styles from "./Pages.module.css";

export default function Categories() {
	const [searchParams, setSearchParamns] = useSearchParams({});
	const id = searchParams.get("id");
	const clearSelection = () => setSearchParamns({});

	const { categories, isLoading, isFetching, category, createCategory, deleteCategory, updateCategory } =
		useCategory(id);

	const isEditing = !!category;

	const handleSave = async (data) => {
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
					<Category
						key={cat.id}
						id={cat.id}
						name={cat.name}
						setToEdit={() => {
							setSearchParamns({ id: cat.id });
						}}
						handleRemove={deleteCategory}
					/>
				))}
			</ul>
			{isFetching && <span>Atualizando...</span>}
			<SectionHeader
				title={isEditing ? "Editando Categoria" : "Adicionar categoria"}
				isEditing={isEditing}
				form="category-form"
				clearSelection={clearSelection}
				isLoading={isFetching}
			/>

			<CategoryForm key={category?.id || "new"} categoryData={category || {}} onSubmit={handleSave} />
		</section>
	);
}
