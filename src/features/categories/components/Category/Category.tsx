import { useLoading } from "@/hooks";
import { Button } from "@/shared";
import styles from "./Category.module.css";

type CategoryProps = {
	id: string;
	name: string;
	handleRemove: (id: string) => void;
	setToEdit: (id: string) => void;
};

export function Category({ id, name, handleRemove, setToEdit }: CategoryProps) {
	const { isLoading, run } = useLoading();

	const handleOnRemove = () => run(() => handleRemove(id));
	const handleOnEdit = () => run(() => setToEdit(id));

	return (
		<li className={styles.item}>
			{name}

			<div className={`${styles.actions} ${styles.buttons}`}>
				<Button onClick={handleOnEdit} color="blue" icon="edit" isLoading={isLoading} />
				<Button onClick={handleOnRemove} color="red" icon="delete" isLoading={isLoading} />
			</div>
		</li>
	);
}
