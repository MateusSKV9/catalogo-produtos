import { useNavigate } from "react-router";
import { Button } from "../Button/Button";
import styles from "./SectionHeader.module.css";

export function SectionHeader({ title, form }) {
	const navigate = useNavigate();

	const handleClick = () => navigate("/");

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>{title}</h1>
			<div>
				<div className={styles.container_buttons}>
					<Button handleClick={handleClick} color="red">
						Cancelar
					</Button>
					<Button color="blue" type="save" submit="submit" form={form}>
						Salvar
					</Button>
				</div>
			</div>
		</div>
	);
}
