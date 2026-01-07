import styles from "./Input.module.css";

export function Input({ id, name, label, placeholder }) {
	return (
		<div className={styles.form_group}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<input className={styles.input} type="text" name={name} id={id} placeholder={placeholder} />
		</div>
	);
}
