import { useParams } from "react-router";


export function ProductEdit() {
	const { id } = useParams();

	return (
		<section>
			<h1>Product Edita</h1>
			<p>Produto {id}</p>
		</section>
	);
}
