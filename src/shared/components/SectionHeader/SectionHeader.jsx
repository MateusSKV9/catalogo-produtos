import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import styles from "./SectionHeader.module.css";

export function SectionHeader({ title, form, isLoading, clearSelection, isEditing }) {
	const navigate = useNavigate();

	const handleClick = () => {
		if (isEditing) {
			clearSelection();
		} else {
			navigate("/");
		}
	};

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>{title}</h2>

			<div className={styles.container_buttons}>
				<Button handleClick={handleClick} color="red">
					{isEditing ? "Cancelar" : "Voltar"}
				</Button>
				<Button color="blue" type="save" submit="submit" form={form} isLoading={isLoading}>
					Salvar
				</Button>
			</div>
		</div>
	);
}
