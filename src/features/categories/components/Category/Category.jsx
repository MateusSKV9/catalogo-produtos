import { Button } from "../../../../shared/components/Button/Button";
import styles from "./Category.module.css";

export function Category({ name, handleRemove, setToEdit }) {
	return (
		<li className={styles.item}>
			{name}

			<div className={`${styles.actions} ${styles.buttons}`}>
				<Button handleClick={setToEdit} style={styles.button} color="blue" type="edit" />
				<Button style={styles.button} color="red" handleClick={handleRemove} type="delete" />
			</div>
		</li>
	);
}
