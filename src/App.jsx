import "./App.css";
import { Routes, Route } from "react-router";
import { Footer } from "./shared/layout/Footer/Footer";
import { Header } from "./shared/layout/Header/Header";
import { NewProduct } from "./pages/NewProduct";
import { Categories } from "./pages/Categories";
import { Products } from "./pages/Products";

function App() {
	return (
		<>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Products />} />
					<Route path="/newProduct" element={<NewProduct />} />
					<Route path="/categories" element={<Categories />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}

export default App;
