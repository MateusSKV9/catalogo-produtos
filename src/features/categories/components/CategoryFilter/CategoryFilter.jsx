import { useCategory } from "../../hooks/useCategory";
import styles from "./CategoryFilter.module.css";
import { useNavigate, useSearchParams } from "react-router";

export function CategoryFilter({ handleFilter }) {
	const { categories } = useCategory();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const categoryIdUrl = searchParams.get("category");

	const handleClick = (id) => {
		if (categoryIdUrl === id) {
			navigate("/");
		} else {
			navigate(`/?category=${id}`);
		}
		handleFilter();
	};

	return (
		<ul className={styles.list}>
			{categories.map((category) => (
				<li
					onClick={() => handleClick(category.id)}
					className={`${styles.item} ${category.id === categoryIdUrl ? styles.active : ""}`}
					key={category.id}
				>
					{category.name}
				</li>
			))}
		</ul>
	);
}
