import React, { useState, useEffect } from "react";

const AddTodo = ({ addTodo }) => {
	const [value, setValue] = useState("");
	const [errors, setErrors] = useState({});

	const handleChange = async e => {
		await setValue(e.target.value);
	};
	const handleSubmit = e => {
		e.preventDefault();
		let data = {
			name: value,
		};
		let errors = addTodo(data);
		// console.log(errors);
		errors.then(data => {
			if (data) {
				setErrors(data.response.data);
			} else {
				setErrors({});
			}
		});
		setValue("");
	};
	return (
		<div className="form-container">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					onChange={handleChange}
					value={value}
					name="name"
					placeholder="Todo Here..."
					id="name"
				/>
				<p className="input-error">{errors.name}</p>
				<button>Add Todo</button>
			</form>
		</div>
	);
};

export default AddTodo;
