export function Input({ id, name, label }) {
	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input type="text" name={name} id={id} />
		</div>
	);
}
