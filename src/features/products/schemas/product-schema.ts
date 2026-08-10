import { z } from "zod";

export const ProductSchema = z.object({
	id: z.string(),
	name: z.string().min(1, "Nome é obrigatório").max(45, "Máximo de 45 caracteres"),

	value: z.coerce.number({ message: "Digite um valor numérico válido" }).min(0, "O valor mínimo é 0"),

	categoryId: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductDataSchema = ProductSchema.omit({ id: true });
export type ProductDataInput = z.input<typeof ProductDataSchema>;
export type ProductData = z.output<typeof ProductDataSchema>;
