import { Spinner } from "../Spinner/Spinner";
import styles from "./Loading.module.css";

export function Loading() {
	return (
		<div className={styles.screen}>
			<Spinner length="middle" />
		</div>
	);
}
