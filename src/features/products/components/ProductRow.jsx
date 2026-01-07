import { Button } from "../../../shared/components/Button/Button";
import styles from "./ProductTable.module.css";

export function ProductRow({ product, category, value }) {
	return (
		<li className={styles.row}>
			<div className={styles.first_coll}>
        <span className={styles.td}>{product}</span>
        <span className={styles.td}>{category}</span>
        <span className={styles.td}>{value}</span>
      </div>
			
      <div className={`${styles.actions} ${styles.buttons}`}>
				<Button type="edit" />
				<Button type="delete" />
			</div>
		</li>
	);
}
