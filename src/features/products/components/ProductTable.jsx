import styles from "./ProductTable.module.css";
import { ProductRow } from "./ProductRow";

export function ProductTable({ products }) {
	return (
		<ul className={styles.table}>
			<div className={styles.header}>
				<span className={styles.th}>Produto</span>
				<span className={styles.th}>Categoria</span>
				<span className={styles.th}>Valor</span>
				<span className={styles.actions}>Ações</span>
			</div>

			{products.map((product) => (
				<ProductRow product={product.name} category={product.category} value={product.value} />
			))}
		</ul>
	);
}
