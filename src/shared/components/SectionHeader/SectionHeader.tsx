import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
	title: string;
	formId: string;
	isLoading: boolean;
	isEditing?: boolean;
	clearSelection?: () => void;
};

export function SectionHeader({ title, formId, isLoading, clearSelection, isEditing }: SectionHeaderProps) {
	const navigate = useNavigate();
	const handleClick = () => (isEditing ? clearSelection?.() : navigate("/"));

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>{title}</h2>

			<div className={styles.container_buttons}>
				<Button onClick={handleClick} color="red">
					{isEditing ? "Cancelar" : "Voltar"}
				</Button>
				<Button color="blue" type="submit" icon="save" form={formId} isLoading={isLoading}>
					Salvar
				</Button>
			</div>
		</div>
	);
}
