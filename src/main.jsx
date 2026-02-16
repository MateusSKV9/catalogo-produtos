import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./providers/ThemeProvider";
import { CategoryProvider } from "./providers/CategoryProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<CategoryProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</CategoryProvider>
			</ThemeProvider>
		</QueryClientProvider>
	</StrictMode>
);
