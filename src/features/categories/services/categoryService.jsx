const API_URL = "http://localhost:3000/categories";

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
};
