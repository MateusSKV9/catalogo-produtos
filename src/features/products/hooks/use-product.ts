import type { Product } from "@/features/products/schemas/product-schema";
import { productService } from "../services/product-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProduct(id?: string) {
	const queryClient = useQueryClient();

	const {
		data: products = [],
		isLoading,
		isFetching,
	} = useQuery({ queryKey: ["products"], queryFn: productService.getAll });

	const { data: product, isLoading: isGetting } = useQuery({
		queryKey: ["product", id],
		queryFn: () => productService.getProduct(id!),
		enabled: !!id,
	});

	const createMutation = useMutation({
		mutationFn: productService.create,
		onSuccess: (newProduct) => {
			queryClient.setQueryData<Product[]>(["products"], (prev = []) => [...prev, newProduct]);
		},
	});

	const updateMutation = useMutation({
		mutationFn: productService.update,
		onSuccess: (updatedProduct) => {
			queryClient.setQueryData<Product[]>(["products"], (prev = []) =>
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

			const previousProducts = queryClient.getQueryData<Product[]>(["products"]);

			queryClient.setQueryData<Product[]>(["products"], (prev = []) =>
				prev.filter((product) => String(product.id) !== String(id))
			);

			return { previousProducts };
		},

		onError: (_err, _deletedId, context) => {
			if (context?.previousProducts) {
				queryClient.setQueryData<Product[]>(["products"], context.previousProducts);
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
		isUpdating: updateMutation.isPending,
		createProduct: createMutation.mutateAsync,
		updateProduct: updateMutation.mutateAsync,
		deleteProduct: deleteMutation.mutateAsync,
	};
}
