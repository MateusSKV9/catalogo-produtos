import type { Product, ProductData } from "@/features/products/schemas/product-schema";
import { ApiError } from "@/shared/errors";

const API_URL = "https://json-server-5bev.onrender.com/products-catalog";

export const productService = {
	async getAll(): Promise<Product[]> {
		const response = await fetch(API_URL);

		if (!response.ok) throw new ApiError("Erro ao buscar produtos.", response.status);
		return response.json();
	},

	async getProduct(id: string): Promise<Product> {
		const response = await fetch(`${API_URL}/${id}`);

		if (!response.ok) throw new ApiError("Erro ao buscar produto.", response.status);
		return response.json();
	},

	async create(product: ProductData): Promise<Product> {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(product),
		});

		if (!response.ok) {
			if (response.status === 403) {
				throw new ApiError(
					"Limite de produtos atingido. Apague alguns produtos já existentes para liberar espaço.",
					response.status
				);
			}

			if (response.status === 429) {
				throw new ApiError("Muitas requisições. Tente novamente em instantes.", response.status);
			}

			throw new ApiError("Erro ao criar produto", response.status);
		}

		return response.json();
	},

	async update(product: Product): Promise<Product> {
		const response = await fetch(`${API_URL}/${product.id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(product),
		});

		if (!response.ok) throw new ApiError("Erro ao atualizar produto.", response.status);
		return response.json();
	},

	async delete(id: string): Promise<void> {
		const response = await fetch(`${API_URL}/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new ApiError("Erro ao deletar produto.", response.status);
		}
	},
};
