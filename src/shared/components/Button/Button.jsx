import styles from "./Button.module.css";

export function Button({ type }) {
	return (
		<button className={`${styles.button} ${styles[type]}`} type="button">
			Botão
		</button>
	);
}
