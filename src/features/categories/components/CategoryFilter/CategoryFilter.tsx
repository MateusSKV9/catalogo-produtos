import { useNavigate, useSearchParams } from "react-router-dom";
import { useCategory } from "@/features/categories";
import styles from "./CategoryFilter.module.css";

type CategoryFilterProps = {
	handleFilter: () => void;
};

export function CategoryFilter({ handleFilter }: CategoryFilterProps) {
	const { categories } = useCategory();
	const [searchParams] = useSearchParams();
	const categoryIdUrl = searchParams.get("category");
	const navigate = useNavigate();

	const handleClick = (id: string) => {
		navigate(categoryIdUrl === id ? "/" : `/?category=${id}`);
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
