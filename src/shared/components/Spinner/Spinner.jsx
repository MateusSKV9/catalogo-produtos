import styles from "./Spinner.module.css";

export function Spinner({ length }) {
	return <div className={`${styles.spinner} ${styles[length]}`}></div>;
}
