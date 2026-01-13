import styles from "./Footer.module.css";

export function Footer() {
	return (
		<footer className={styles.footer}>
			<p  className={styles.p}>
				<span>Site desenvolvido por</span> <a href="">Mateus Santos</a>
			</p>
		</footer>
	);
}
