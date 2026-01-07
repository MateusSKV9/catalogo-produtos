import { Link } from "react-router";
import styles from "./Header.module.css";

export function Header() {
	return (
		<header className={styles.header}>
			<h1 className={styles.logo}>Catálogo de Produtos</h1>j
			<div className={styles.wrapper}>
				<ul>
					<li>
						<Link to="/">Início</Link>
					</li>
				</ul>

				<form className={styles.form}>
					<span>Lupa</span>
					<input type="text" name="search" id="search" placeholder="Pesquisar" />
				</form>
				<button className={styles.themeButton} type="button">
					Theme
				</button>
			</div>
		</header>
	);
}
