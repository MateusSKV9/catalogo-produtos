import { Button } from "../../../../shared/components/Button/Button";
import styles from "./ProductHeader.module.css";
import { CategoryFilter } from "../../../categories/components/CategoryFilter/CategoryFilter";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function ProductHeader({ quantityProducts, quantityCategories }) {
	const navigate = useNavigate();
	const handleNewProduct = () => navigate("/newproduct");
	const handleCategories = () => navigate("/categories");
	const [showBoxFilter, setShowBoxFilter] = useState(false);
	const [searchParams] = useSearchParams();
	const categoryId = searchParams.get("category");
	const filterRef = useRef(null);

	const handleFilter = () => setShowBoxFilter((prev) => !prev);

	useEffect(() => {
		function handleClickOUtside(event) {
			if (setShowBoxFilter && filterRef.current && !filterRef.current.contains(event.target)) {
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
					<Button handleClick={handleNewProduct} type="default">
						Novo Produto
					</Button>
					<Button handleClick={handleCategories} type="default">
						Categorias
					</Button>
					<div className={styles.container_filter} ref={filterRef} style={{ position: "relative" }}>
						<Button color={categoryId && "highlight"} handleClick={handleFilter} type="default">
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
