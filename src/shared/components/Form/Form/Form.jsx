import styles from "./Form.module.css";

export function Form({ id, children, handleOnSubmit }) {
	return (
		<form id={id} onSubmit={handleOnSubmit} className={styles.form}>
			{children}
		</form>
	);
}
