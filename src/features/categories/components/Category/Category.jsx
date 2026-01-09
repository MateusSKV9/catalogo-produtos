import { Button } from "../../../../shared/components/Button/Button";
// import { useCategory } from "../../hooks/useCategory";
import styles from "./Category.module.css";

export function Category({ id, name, handleRemove, setToEdit }) {
	const handleOnRemove = () => {
		handleRemove(id);
	};

	return (
		<li className={styles.item}>
			{name}

			<div className={`${styles.actions} ${styles.buttons}`}>
				<Button handleClick={setToEdit} style={styles.button} color="blue" type="edit" />
				<Button style={styles.button} color="red" handleClick={handleOnRemove} type="delete" />
			</div>
		</li>
	);
}
