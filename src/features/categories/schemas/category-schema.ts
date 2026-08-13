import z from "zod";

export const CategorySchema = z.object({ id: z.string(), name: z.string().min(1, "Nome é obrigatório") });
export type Category = z.infer<typeof CategorySchema>;

export const CategoryDataSchema = CategorySchema.omit({ id: true });
export type CategoryData = z.infer<typeof CategoryDataSchema>;
