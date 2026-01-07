import { useEffect, useState } from "react";
import { productService } from "../services/productService";

export function useProduct() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	async function loadProducts() {
		try {
			const data = await productService.getAll();
			setProducts(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	async function addProduct(product) {
		try {
			await productService.create(product);
			loadProducts();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	async function removeProduct(id) {
		try {
			await productService.delete(id);
			loadProducts();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => loadProducts, []);

	return { products, loadProducts, addProduct, removeProduct, loading };
}
