const API_URL = "https://json-server-5bev.onrender.com/categories_catalog";

export const categoryService = {
	async getAll() {
		const response = await fetch(API_URL);

		if (!response.ok) throw new Error("Algo deu errado ao buscar as categorias.");
		return response.json();
	},

	async create(category) {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(category),
		});

		if (!response.ok) throw new Error("Erro ao criar categoria");

		return response.json();
	},

	async getCategory(id) {
		const response = await fetch(`${API_URL}/${id}`);

		if (!response.ok) throw new Error("Erro ao buscar categoria.");

		return response.json();
	},

	async update(category) {
		const response = await fetch(`${API_URL}/${category.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(category),
		});

		if (!response.ok) throw new Error("Errp ao atualizar categoria.");

		return response.json();
	},

	async delete(id) {
		const response = await fetch(`${API_URL}/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) {
			const error = new Error("Erro ao deletar");
			error.status = response.status;
			throw error;
		}
	},
};
