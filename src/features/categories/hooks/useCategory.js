import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext } from "react";
import { categoryService } from "../services/categoryService";

export const CategoryContext = createContext();

export const useCategory = (id) => {
	const queryClient = useQueryClient();

	const {
		data: categories = [],
		isLoading,
		isFetching,
	} = useQuery({ queryKey: ["categories"], queryFn: categoryService.getAll });

	const { data: category, isLoading: isGetting } = useQuery({
		queryKey: ["category", id],
		queryFn: () => categoryService.getCategory(id),
		enabled: !!id,
	});

	const createMutation = useMutation({
		mutationFn: categoryService.create,
		onSuccess: (newCategory) => {
			queryClient.setQueryData(["categories"], (prev = []) => [...prev, newCategory]);
		},
	});

	const updateMutation = useMutation({
		mutationFn: categoryService.update,
		onSuccess: (updatedCategory) => {
			queryClient.setQueryData(["categories"], (prev = []) => {
				return prev.map((category) => (category.id === updatedCategory.id ? updatedCategory : category));
			});

			queryClient.setQueryData(["category", updatedCategory.id], updatedCategory);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: categoryService.delete,

		onMutate: async (id) => {
			await queryClient.cancelQueries({ queryKey: ["categories"] });
			await queryClient.cancelQueries({ queryKey: ["category", id] });
			const previousCategories = queryClient.getQueryData(["categories"]);

			queryClient.setQueryData(["categories"], (prev = []) => prev.filter((category) => category.id !== id));
			return { previousCategories };
		},

		onError: (err, id, context) => {
			if (err?.status !== 404) {
				if (context?.previousCategories) {
					queryClient.setQueryData(["categories"], context.previousCategories);
				}
			}
		},

		onSettled: (_, __, id) => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			queryClient.invalidateQueries({ queryKey: ["category", id] });
		},
	});

	return {
		categories,
		category,
		isLoading,
		isFetching,
		isGetting,
		isCreating: createMutation.isPending,
		createCategory: createMutation.mutateAsync,
		updateCategory: updateMutation.mutateAsync,
		deleteCategory: deleteMutation.mutateAsync,
	};
};
