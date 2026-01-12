import { useCallback, useEffect, useState } from "react";
import { productService } from "../services/productService";

export function useProduct(id) {
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState({});
	const [productsLoading, setProductsLoading] = useState(true);

	const loadProducts = useCallback(async () => {
		try {
			const data = await productService.getAll();
			setProducts(data);
		} catch (error) {
			console.error(error);
		} finally {
			setProductsLoading(false);
		}
	}, []);

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
		if (!id) {
			loadProducts();
			return;
		}

		const fetchProduct = async () => {
			setProductsLoading(true);
			try {
				const data = await productService.getProduct(id);
				setProduct(data);
			} catch (error) {
				console.error(error);
			} finally {
				setProductsLoading(false);
			}
		};

		fetchProduct();
	}, [id, loadProducts]);

	return { products, product, productsLoading, loadProducts, addProduct, removeProduct, updateProduct };
}
