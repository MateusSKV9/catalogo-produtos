import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import { Products } from "@/pages/Products";
import { Header, Loading, Footer } from "@/shared";
import "./App.css";

const NewProduct = lazy(() => import("./pages/NewProduct"));
const Categories = lazy(() => import("./pages/Categories"));
const ProductEdit = lazy(() => import("./pages/ProductEdit"));

export default function App() {
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
