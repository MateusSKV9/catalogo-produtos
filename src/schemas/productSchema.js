import { z } from "zod";

export const productSchema = z.object({
	name: z.string().min(1, "Nome é obrigatório").max(45, "Máximo de 45 caracteres"),
	value: z
		.string()
		.min(1, "Valor é obrigatório")
		.transform((val) => Number(val))
		.refine((val) => !isNaN(val), {
			message: "Valor deve ser um número",
		})
		.refine((val) => val >= 0, {
			message: "O valor mínimo é 0",
		}),
	categoryId: z.string().optional(),
});
