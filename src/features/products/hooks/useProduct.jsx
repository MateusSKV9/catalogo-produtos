import { useEffect, useState } from "react";
import { productService } from "../services/productService";

export function useProduct(id) {
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState({});
	const [productsLoading, setProductsLoading] = useState(true);

	async function loadProducts() {
		try {
			const data = await productService.getAll();
			setProducts(data);
		} catch (error) {
			console.error(error);
		} finally {
			setProductsLoading(false);
		}
	}

	async function loadProduct(id) {
		try {
			const data = await productService.getProduct(id);
			return data;
		} catch (error) {
			console.error(error);
		}
	}

	async function updateProduct(project) {
		try {
			await productService.update(project);
		} catch (error) {
			console.error(error);
		}
	}

	async function addProduct(product) {
		try {
			await productService.create(product);
			await loadProducts();
		} catch (error) {
			console.error(error);
		} finally {
			setProductsLoading(false);
		}
	}

	async function removeProduct(id) {
		try {
			await productService.delete(id);
			loadProducts();
		} catch (error) {
			console.error(error);
		} finally {
			setProductsLoading(false);
		}
	}

	useEffect(() => {
		loadProducts();
	}, []);

	useEffect(() => {
		if (!id) return;

		const fetchProduct = async () => {
			const data = await productService.getProduct(id);
			setProduct(data);
		};

		fetchProduct();
	}, [id]);

	return { products, product, productsLoading, loadProducts, loadProduct, addProduct, removeProduct, updateProduct };
}
