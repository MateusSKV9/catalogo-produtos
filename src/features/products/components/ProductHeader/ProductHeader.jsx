import { useNavigate } from "react-router";
import { Button } from "../../../../shared/components/Button/Button";
import styles from "./ProductHeader.module.css";

export function ProductHeader({ length }) {
	const navigate = useNavigate();
	const handleNewProduct = () => navigate("/newproduct");
	const handleCategories = () => navigate("/categories");

	return (
		<div className={styles.header}>
			<div className={styles.intro}>
				<h1>Produtos catalogados</h1>
				<div className={styles.container_buttons}>
					<Button handleClick={handleNewProduct} type="default">
						Novo Produto
					</Button>
					<Button handleClick={handleCategories} type="default">
						Categorias
					</Button>
					<Button type="default">Filtrar por</Button>
				</div>
			</div>
			<div className={styles.container_badges}>
				<div className={styles.badge}>Quantidade de produtos: {length}</div>
				<div className={styles.badge}>Categorias: {}</div>
			</div>
		</div>
	);
}
