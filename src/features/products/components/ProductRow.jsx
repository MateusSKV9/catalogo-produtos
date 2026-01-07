import { Button } from "../../../shared/components/Button/Button";

export function ProductRow({ product, category, value }) {
	return (
		<tr>
			<td>{product}</td>
			<td>{category}</td>
			<td>{value}</td>
			<td>
				<Button />
				<Button />
			</td>
		</tr>
	);
}
