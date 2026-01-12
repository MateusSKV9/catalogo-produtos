import { createContext, useContext } from "react";

export const CategoryContext = createContext();

export const useCategory = () => {
	const context = useContext(CategoryContext);
	if (!context) {
		throw new Error("useCategory deve ser usado dentro de um CategoryProvider");
	}
	return context;
};
