import type { Category } from "@/features/categories/schemas/category-schema";
import { categoryService } from "@/features/categories/services/category-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";

type CategoryContextType = {
	categories: Category[];
	isLoading: boolean;
};

export const CategoryContext = createContext<CategoryContextType | null>(null);

export const useCategoryContext = () => {
	const context = useContext(CategoryContext);
	if (!context) {
		throw new Error("useCategoryContext deve ser usado dentro de um CategoryProvider");
	}
	return context;
};

export const useCategory = (id?: string) => {
	const queryClient = useQueryClient();

	const {
		data: categories = [],
		isLoading,
		isFetching,
	} = useQuery<Category[]>({
		queryKey: ["categories"],
		queryFn: categoryService.getAll,
	});

	const { data: category, isLoading: isGetting } = useQuery<Category>({
		queryKey: ["category", id],
		queryFn: () => categoryService.getCategory(id!),
		enabled: !!id,
	});

	const createMutation = useMutation({
		mutationFn: categoryService.create,
		onSuccess: (newCategory) => {
			queryClient.setQueryData<Category[]>(["categories"], (prev = []) => [...prev, newCategory]);
			// queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: categoryService.update,
		onSuccess: (updatedCategory) => {
			queryClient.setQueryData<Category[]>(["categories"], (prev = []) =>
				prev.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
			);
			queryClient.setQueryData<Category>(["category", updatedCategory.id], updatedCategory);
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: categoryService.delete,
		onMutate: async (deletedId: string) => {
			await queryClient.cancelQueries({ queryKey: ["categories"] });
			await queryClient.cancelQueries({ queryKey: ["category", deletedId] });

			const previousCategories = queryClient.getQueryData<Category[]>(["categories"]);

			queryClient.setQueryData<Category[]>(["categories"], (prev = []) => prev.filter((c) => c.id !== deletedId));

			return { previousCategories };
		},

		onError: (err, deletedId, context) => {
			if (context?.previousCategories) {
				queryClient.setQueryData<Category[]>(["categories"], context.previousCategories);
			}
		},

		onSettled: (_, __, deletedId) => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			queryClient.invalidateQueries({ queryKey: ["category", deletedId] });
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
