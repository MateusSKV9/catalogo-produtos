import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CategoryFilter } from "@/features/categories";
import { Button } from "@/shared";
import styles from "./ProductHeader.module.css";

type ProductHeaderProps = {
	quantityProducts: number;
	quantityCategories: number;
};

export function ProductHeader({ quantityProducts, quantityCategories }: ProductHeaderProps) {
	const navigate = useNavigate();
	const handleNewProduct = () => navigate("/newproduct");
	const handleCategories = () => navigate("/categories");
	const [showBoxFilter, setShowBoxFilter] = useState(false);
	const [searchParams] = useSearchParams();
	const categoryId = searchParams.get("category");
	const filterRef = useRef<HTMLDivElement | null>(null);

	const handleFilter = () => setShowBoxFilter((prev) => !prev);

	useEffect(() => {
		function handleClickOUtside(event: MouseEvent) {
			if (
				setShowBoxFilter &&
				filterRef.current &&
				event.target instanceof Node &&
				!filterRef.current.contains(event.target)
			) {
				setShowBoxFilter(false);
			}
		}

		document.addEventListener("mousedown", handleClickOUtside);

		return () => {
			document.removeEventListener("mousedown", handleClickOUtside);
		};
	}, [showBoxFilter]);

	return (
		<div className={styles.header}>
			<div className={styles.intro}>
				<h1 className={styles.title}>Produtos catalogados</h1>
				<div className={styles.container_buttons}>
					<Button onClick={handleNewProduct} style="default">
						Novo Produto
					</Button>
					<Button onClick={handleCategories} style="default">
						Categorias
					</Button>
					<div className={styles.container_filter} ref={filterRef}>
						<Button color={categoryId ? "highlight" : ""} onClick={handleFilter} style="default">
							Filtrar por
						</Button>
						{showBoxFilter && <CategoryFilter handleFilter={handleFilter} />}
					</div>
				</div>
			</div>
			<div className={styles.container_badges}>
				<div className={styles.badge}>Quantidade de produtos: {quantityProducts}</div>
				<div className={styles.badge}>Categorias: {quantityCategories}</div>
			</div>
		</div>
	);
}
