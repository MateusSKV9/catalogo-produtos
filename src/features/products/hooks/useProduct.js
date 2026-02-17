import { productService } from "../services/productService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProduct(id) {
	const queryClient = useQueryClient();

	const {
		data: products = [],
		isLoading,
		isFetching,
	} = useQuery({ queryKey: ["products"], queryFn: productService.getAll });

	const { data: product, isLoading: isGetting } = useQuery({
		queryKey: ["product", id],
		queryFn: () => productService.getProduct(id),
		enabled: !!id,
	});

	const createMutation = useMutation({
		mutationFn: productService.create,
		onSuccess: (newProduct) => {
			queryClient.setQueryData(["products"], (prev = []) => [...prev, newProduct]);
		},
	});

	const updateMutation = useMutation({
		mutationFn: productService.update,
		onSuccess: (updatedProduct) => {
			queryClient.setQueryData(["products"], (prev = []) =>
				prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
			);

			queryClient.setQueryData(["product", updatedProduct.id], updatedProduct);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: productService.delete,

		onMutate: async (id) => {
			await queryClient.cancelQueries({ queryKey: ["products"] });
			await queryClient.cancelQueries({ queryKey: ["product", id] });
			const previousProducts = queryClient.getQueryData(["products"]);
			queryClient.setQueryData(["products"], (prev = []) => prev.filter((product) => product.id !== id));
			return { previousProducts };
		},

		onError: (err, id, context) => {
			if (err?.status !== 404) {
				if (context?.previousProducts) {
					queryClient.setQueryData(["products"], context.previousProducts);
				}
			}
		},

		onSettled: (_, __, id) => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["product", id] });
		},
	});

	return {
		products,
		product,
		isLoading,
		isFetching,
		isGetting,
		isCreating: createMutation.isPending,
		createProduct: createMutation.mutateAsync,
		updateProduct: updateMutation.mutateAsync,
		deleteProduct: deleteMutation.mutateAsync,
	};
}
