import { ProductRow } from "./ProductRow";

export function ProductTable({ products }) {
	return (
		<table>
			<thead>
				<tr>
					<th>Produto</th>
					<th>Categoria</th>
					<th>Valor</th>
					<th>Ações</th>
				</tr>
			</thead>
			<tbody>
				{products.map((product) => (
					<ProductRow key={product.id} product={product.name} category={product.category} value={product.value} />
				))}
			</tbody>
		</table>
	);
}
