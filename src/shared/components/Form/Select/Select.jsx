import { forwardRef } from "react";
import styles from "./../Input/Input.module.css";
import stylesSelect from "./Select.module.css";

export const Select = forwardRef(({ label, options, ...props }, ref) => {
	return (
		<div className={styles.form_group}>
			<label className={styles.label} htmlFor={props.id}>
				{label}
			</label>
			<select ref={ref} className={stylesSelect.select} {...props}>
				<option disabled value="">
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
});
