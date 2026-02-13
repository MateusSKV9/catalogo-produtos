import styles from "./ProductTable.module.css";
import { ProductRow } from "../ProductRow/ProductRow";

export function ProductTable({ products, onDelete }) {
	return (
		<ul className={styles.table}>
			<li className={styles.header}>
				<div className={styles.row}>
					<div className={styles.first_coll}>
						<span className={styles.th}>Produto</span>
						<span className={styles.th}>Categoria</span>
						<span className={styles.th}>Valor</span>
					</div>
					<span className={`${styles.actions} ${styles.th}`}>Ações</span>
				</div>
			</li>

			<li>
				<ul className={styles.body}>
					{products.map((product) => (
						<ProductRow key={product.id} product={product} onDelete={onDelete} />
					))}
				</ul>
			</li>
		</ul>
	);
}
