import type { ReactNode } from "react";
import styles from "./Form.module.css";

type FormProps = {
	id: string;
	children: ReactNode;
} & React.ComponentProps<"form">;

export function Form({ id, children, onSubmit, ...props }: FormProps) {
	return (
		<form id={id} onSubmit={onSubmit} className={styles.form} {...props}>
			{children}
		</form>
	);
}
