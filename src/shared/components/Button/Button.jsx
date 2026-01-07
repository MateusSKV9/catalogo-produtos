import styles from "./Button.module.css";

export function Button({ type, children, handleClick }) {
	return (
		<button onClick={handleClick} class={`${styles.button} ${styles[type]}`} type="button">
			{children}
		</button>
	);
}
