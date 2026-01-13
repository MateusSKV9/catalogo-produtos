import styles from "./Input.module.css";

export function Input({ id, name, value, type, label, placeholder, handleChange, }) {
	return (
		<div className={styles.form_group}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<input
				className={styles.input}
				type={type}
				name={name}
				id={id}
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				required
			/>
		</div>
	);
}
