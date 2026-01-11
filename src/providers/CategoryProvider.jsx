import { useEffect, useState, useCallback } from "react";
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

	async function addCategory(category) {
		try {
			await categoryService.create(category);
			await loadCategories();
		} catch (error) {
			console.error(error);
		}
	}

	async function update(category) {
		try {
			await categoryService.update(category);
			await loadCategories();
		} catch (error) {
			console.error(error);
		}
	}

	async function remove(id) {
		try {
			await categoryService.delete(id);
			await loadCategories();
		} catch (error) {
			console.error(error);
		}
	}

	async function getCategoryById(id) {
		const data = await categoryService.getCategory(id);
		setSelectedCategory(data);
	}

	const clearSelection = () => setSelectedCategory(null);

	const value = {
		categories,
		categoriesLoading,
		addCategory,
		selectedCategory,
		clearSelection,
		getCategoryById,
		update,
		remove,
		loadCategories,
	};

	return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}
