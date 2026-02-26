import { Button } from "../../../../shared/components/Button/Button";
import styles from "./../ProductTable/ProductTable.module.css";
import { useCategory } from "../../../categories/hooks/useCategory";
import { useLoading } from "../../../../hooks/useLoading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProductRow({ product, onDelete }) {
	const { id, name, categoryId, value } = product;
	const { categories } = useCategory();
	const { isLoading, run } = useLoading();
	const [showActionsMobile, setShowActionsMobile] = useState(false);

	const navigate = useNavigate();

	const categoryData = categories.find((category) => category.id === categoryId);

	const handleDelete = (e) => {
		e.stopPropagation();
		run(() => onDelete(id));
	};

	const handleEdit = (e) => {
		e.stopPropagation();
		navigate(`/product/${id}`);
	};

	const handleShowActionsMobile = () => {
		setShowActionsMobile((prev) => !prev);
	};

	return (
		<li onClick={handleShowActionsMobile} className={`${styles.row} ${showActionsMobile ? styles.active : ""}`}>
			<svg className={styles.arrow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
				<path
					fill="currentColor"
					d="M598.6 342.6C611.1 330.1 611.1 309.8 598.6 297.3L470.6 169.3C458.1 156.8 437.8 156.8 425.3 169.3C412.8 181.8 412.8 202.1 425.3 214.6L498.7 288L64 288C46.3 288 32 302.3 32 320C32 337.7 46.3 352 64 352L498.7 352L425.3 425.4C412.8 437.9 412.8 458.2 425.3 470.7C437.8 483.2 458.1 483.2 470.6 470.7L598.6 342.7z"
				/>
			</svg>

			<div className={styles.first_coll}>
				<span className={`${styles.td} ${styles.name}`}>{name}</span>
				<span className={styles.td}>{categoryData ? categoryData.name : "Sem categoria"}</span>
				<span className={styles.td}>R$ {Number(value).toFixed(2)}</span>
			</div>

			<div className={`${styles.buttons} ${styles.actions}`}>
				<Button color="blue" type="edit" handleClick={handleEdit}>
					Editar
				</Button>
				<Button color="red" type="delete" handleClick={handleDelete} isLoading={isLoading}>
					Deletar
				</Button>
			</div>
		</li>
	);
}
