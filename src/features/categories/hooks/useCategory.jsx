import { useEffect, useState } from "react";
import { categoryService } from "../services/categoryService";

export function useCategory() {
	const [categories, setCategories] = useState([]);

	async function loadCategories() {
		try {
			const data = await categoryService.getAll();
			setCategories(data);
		} catch (error) {
			console.error(error);
		}
	}

	async function addCategory(category) {
		try {
			await categoryService.create(category);
			loadCategories();
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		const fetchCategories = async () => {
			await loadCategories();
		};

		fetchCategories();
	}, []);

	return { categories, addCategory };
}
