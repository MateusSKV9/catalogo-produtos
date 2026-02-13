import styles from "./Footer.module.css";

export function Footer() {
	return (
		<footer className={styles.footer}>
			<p className={styles.p}>
				<span>Site desenvolvido por</span>
				<a href="https://www.linkedin.com/in/mateus-santos-1a7361246/" target="_blank" rel="noopener noreferrer">
					Mateus Santos
				</a>
			</p>
			<span className={styles.rights}>© {new Date().getFullYear()} Mateus Santos</span>
		</footer>
	);
}
