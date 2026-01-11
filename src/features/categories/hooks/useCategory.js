import { useContext } from "react";
import { createContext } from "react";

export const CategoryContext = createContext();

export function useCategory() {
	const context = useContext(CategoryContext);
	if (!context) {
		throw new Error("useCategory deve ser usado dentro de um CategoryProvider");
	}
	return context;
}
