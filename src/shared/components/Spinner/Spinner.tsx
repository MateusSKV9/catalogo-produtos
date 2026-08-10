import styles from "./Spinner.module.css";

type SpinnerProps = {
	length: string;
};

export function Spinner({ length }: SpinnerProps) {
	return <div className={`${styles.spinner} ${styles[length]}`}></div>;
}
