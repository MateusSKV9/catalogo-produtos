import z from "zod";

export const CategorySchema = z.object({ id: z.string(), name: z.string().min(1, "Nome é obrigatório") });
export type Category = z.infer<typeof CategorySchema>;

export const CategoryDataSchema = z.object({ name: z.string().min(1, "Nome é obrigatório") });
export type CategoryData = z.infer<typeof CategoryDataSchema>;
