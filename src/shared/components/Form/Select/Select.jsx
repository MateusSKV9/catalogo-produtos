import styles from "./../Input/Input.module.css";
import stylesSelect from "./Select.module.css";

export function Select({ id, name, label, options }) {
	return (
		<div className={styles.form_group}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<select className={stylesSelect.select} name={name} id={id}>
				<option selected disabled value="">
					Selecione uma categoria
				</option>
				{options.map((option) => (
					<option key={option.id} value={option.id}>
						{option.name}
					</option>
				))}
			</select>
		</div>
	);
}
