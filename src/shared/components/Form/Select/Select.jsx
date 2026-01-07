export function Select({ id, name, label, options }) {
	return (
		<>
			<label htmlFor={id}>{label}</label>
			<select name={name} id={id}>
				<option selected disabled value="">
					Selecione uma categoria
				</option>
				{options.map((option) => (
					<option value={option.id}>{option.name}</option>
				))}
			</select>
		</>
	);
}
