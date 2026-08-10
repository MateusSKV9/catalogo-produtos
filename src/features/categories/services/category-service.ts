import type { Category, CategoryData } from "@/features/categories/schemas/category-schema";
import { ApiError } from "@/shared/errors";

const API_URL = "https://json-server-5bev.onrender.com/categories-catalog";

export const categoryService = {
	async getAll(): Promise<Category[]> {
		const response = await fetch(API_URL);

		if (!response.ok) throw new ApiError("Algo deu errado ao buscar as categorias.", response.status);
		return response.json();
	},

	async create(category: CategoryData): Promise<Category> {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(category),
		});

		if (!response.ok) throw new ApiError("Erro ao criar categoria.", response.status);

		return response.json();
	},

	async getCategory(id: string): Promise<Category> {
		const response = await fetch(`${API_URL}/${id}`);

		if (!response.ok) throw new ApiError("Erro ao buscar categoria.", response.status);

		return response.json();
	},

	async update(category: Category): Promise<Category> {
		const response = await fetch(`${API_URL}/${category.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(category),
		});

		if (!response.ok) throw new ApiError("Erro ao atualizar categoria.", response.status);

		return response.json();
	},

	async delete(id: string): Promise<void> {
		const response = await fetch(`${API_URL}/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) {
			throw new ApiError("Erro ao deletar categoria.", response.status);
		}
	},
};
