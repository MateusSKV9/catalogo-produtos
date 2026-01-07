import { useEffect, useState } from "react";
import { categoryService } from "../services/categoryService";

export function useCategories() {
	const [categories, setCategories] = useState([]);

	async function loadCategories() {
		try {
			const data = await categoryService.getAll();
			setCategories(data);
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

	return categories;
}
