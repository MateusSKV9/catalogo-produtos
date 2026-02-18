import { createContext, useContext } from "react";

export const ThemeContext = createContext();

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
	}
	return context;
};
