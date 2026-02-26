import "./App.css";
import { Routes, Route } from "react-router";
import { Footer } from "./shared/layout/Footer/Footer";
import { Header } from "./shared/layout/Header/Header";
import { Products } from "./pages/Products";
import { lazy, Suspense } from "react";
import { Loading } from "./shared/components/Loading/Loading";

const NewProduct = lazy(() => import("./pages/NewProduct"));
const Categories = lazy(() => import("./pages/Categories"));
const ProductEdit = lazy(() => import("./pages/ProductEdit"));

function App() {
	return (
		<>
			<Header />
			<main>
				<Suspense fallback={<Loading />}>
					<Routes>
						<Route path="/" element={<Products />} />
						<Route path="/newProduct" element={<NewProduct />} />
						<Route path="/categories" element={<Categories />} />
						<Route path="/product/:id" element={<ProductEdit />} />
					</Routes>
				</Suspense>
			</main>
			<Footer />
		</>
	);
}

export default App;
