import { Button } from "../../../../shared/components/Button/Button";
import styles from "./Category.module.css";
import { useLoading } from "../../../../hooks/useLoading";

export function Category({ id, name, handleRemove, setToEdit }) {
	const { isLoading, run } = useLoading();

	const handleOnRemove = () => run(() => handleRemove(id));

	const handleOnEdit = () => run(() => setToEdit(id));

	return (
		<li className={styles.item}>
			{name}

			<div className={`${styles.actions} ${styles.buttons}`}>
				<Button handleClick={handleOnEdit} style={styles.button} color="blue" type="edit" isLoading={isLoading} />
				<Button style={styles.button} color="red" handleClick={handleOnRemove} type="delete" isLoading={isLoading} />
			</div>
		</li>
	);
}
