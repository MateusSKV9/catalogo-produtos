import type { ReactNode } from "react";
import { Spinner } from "../Spinner/Spinner";
import { ICONS, type IconType } from "@/icons/icons";
import styles from "./Button.module.css";

type ButtonProps = {
	style?: "button" | "default";
	isLoading?: boolean;
	color?: string;
	icon?: IconType;
	formId?: string;
	children?: ReactNode;
} & React.ComponentProps<"button">;

export function Button({ icon, children, onClick, color, style = "button", formId, isLoading, ...props }: ButtonProps) {
	const renderIcon = () => {
		if (!icon || !ICONS[icon]) return null;
		const IconComponent = ICONS[icon];
		return <IconComponent />;
	};

	return (
		<button
			onClick={onClick}
			className={`${styles.button} ${color ? styles[color] : ""} ${style ? styles[style] : ""}`}
			disabled={isLoading}
			form={formId}
			{...props}
		>
			{children}
			{isLoading ? <Spinner length="small" /> : renderIcon()}
		</button>
	);
}
