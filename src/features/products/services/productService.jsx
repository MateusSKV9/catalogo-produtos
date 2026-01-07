const API_URL = "http://localhost:3000/products";

export const productService = {
	async getAll() {
		const response = await fetch(API_URL);

		if (!response.ok) throw new Error("Erro ao buscar produtos.");
		return response.json();
	},

	async create(product) {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(product),
		});

		if (!response.ok) throw new Error("Erro ao criar produto.");
		return response.json();
	},

	async update(product) {
		const response = await fetch(`${API_URL}/${product.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(product),
		});

		if (!response.ok) throw new Error("Erro ao atualizar produto.");
		return response.json();
	},

	async delete(id) {
		const response = await fetch(`${API_URL}/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) throw new Error("Erro ao deletar produto.");
	},
};
