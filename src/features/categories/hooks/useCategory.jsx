import { useEffect, useState } from "react";
import { categoryService } from "../services/categoryService";

export function useCategory() {
	const [categories, setCategories] = useState([]);
	const [categoriesLoading, setCatoriesLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState(null);

	async function loadCategories() {
		try {
			const data = await categoryService.getAll();
			setCategories(data);
		} catch (error) {
			console.error(error);
		} finally {
			setCatoriesLoading(false);
		}
	}

	async function addCategory(category) {
		try {
			await categoryService.create(category);
			loadCategories();
		} catch (error) {
			console.error(error);
		} finally {
			setCatoriesLoading(false);
		}
	}

	async function update(category) {
		try {
			await categoryService.update(category);
			loadCategories();
		} catch (error) {
			console.error(error);
		}
	}

	async function remove(id) {
		try {
			await categoryService.delete(id);
			loadCategories();
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		loadCategories();
	}, []);

	async function getCategoryById(id) {
		const data = await categoryService.getCategory(id);
		setSelectedCategory(data);
	}

	const clearSelection = () => setSelectedCategory(null);

	return {
		categories,
		categoriesLoading,
		addCategory,
		selectedCategory, 
		clearSelection,
		getCategoryById,
		update,
		remove,
	};
}
