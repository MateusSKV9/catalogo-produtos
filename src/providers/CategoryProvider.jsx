import { useEffect, useState, useCallback, useMemo } from "react";
import { categoryService } from "./../features/categories/services/categoryService";
import { CategoryContext } from "../features/categories/hooks/useCategory";

export function CategoryProvider({ children }) {
	const [categories, setCategories] = useState([]);
	const [categoriesLoading, setCategoriesLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const loadCategories = useCallback(async () => {
		try {
			setCategoriesLoading(true);
			const data = await categoryService.getAll();
			setCategories(data);
		} catch (error) {
			console.error("Erro ao carregar categorias:", error);
		} finally {
			setCategoriesLoading(false);
		}
	}, []);

	useEffect(() => {
		loadCategories();
	}, [loadCategories]);

	const addCategory = useCallback(
		async (category) => {
			try {
				await categoryService.create(category);
				await loadCategories();
			} catch (error) {
				console.error(error);
			}
		},
		[loadCategories]
	);

	const update = useCallback(
		async (category) => {
			try {
				await categoryService.update(category);
				await loadCategories();
			} catch (error) {
				console.error(error);
			}
		},
		[loadCategories]
	);

	const remove = useCallback(
		async (id) => {
			try {
				await categoryService.delete(id);
				await loadCategories();
			} catch (error) {
				console.error(error);
			}
		},
		[loadCategories]
	);

	const getCategoryById = useCallback(async (id) => {
		const data = await categoryService.getCategory(id);
		setSelectedCategory(data);
	}, []);

	const clearSelection = useCallback(() => setSelectedCategory(null), []);

	const value = useMemo(
		() => ({
			categories,
			categoriesLoading,
			addCategory,
			selectedCategory,
			clearSelection,
			getCategoryById,
			update,
			remove,
			loadCategories,
		}),
		[
			categories,
			categoriesLoading,
			selectedCategory,
			addCategory,
			getCategoryById,
			clearSelection,
			remove,
			update,
			loadCategories,
		]
	);

	return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}
