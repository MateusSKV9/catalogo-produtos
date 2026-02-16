const API_URL = "https://json-server-5bev.onrender.com/products_catalog";

export const productService = {
	async getAll() {
		const response = await fetch(API_URL);

		if (!response.ok) throw new Error("Erro ao buscar produtos.");
		return response.json();
	},

	async getProduct(id) {
		const response = await fetch(`${API_URL}/${id}`);

		if (!response.ok) throw new Error("Erro ao buscar produto.");
		return response.json();
	},

	async create(product) {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(product),
		});

		if (!response.ok) {
			const error = await response.json();

			if (response.status === 403) {
				throw new Error(
					error.error || "Limite de produtos atingido. Apague alguns produtos já exitentes para liberar espaço."
				);
			}

			if (response.status === 429) {
				throw new Error("Muitas requisições. Tente novamente em instantes.");
			}

			throw new Error("Erro ao criar produto");
		}

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

		if (!response.ok) {
			const error = new Error("Erro ao deletar produto.");
			error.status = response.status;
			throw error;
		}
	},
};
