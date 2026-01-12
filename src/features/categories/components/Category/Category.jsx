import { useState } from "react";
import { Button } from "../../../../shared/components/Button/Button";
import styles from "./Category.module.css";

export function Category({ id, name, handleRemove, setToEdit }) {
	const [isLoading, setIsLoading] = useState(false);

	const handleOnRemove = async () => {
		setIsLoading(true);
		try {
			await handleRemove(id);
		} catch (error) {
			console.error(error);
		}
		setIsLoading(false);
	};

	const handleOnEdit = async () => {
		setIsLoading(true);
		try {
			await setToEdit(id);
		} catch (error) {
			console.error(error);
		}
		setIsLoading(false);
	};

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
