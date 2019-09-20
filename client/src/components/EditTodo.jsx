import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";

const EditTodo = ({ match: { params }, history }) => {
	const user = useSelector(state => state.auth.user);
	const [value, setValue] = useState("");
	const [errors, setErrors] = useState({});

	useEffect(() => {
		getTodo();
	}, []);

	const getTodo = async () => {
		const res = await Axios.get(`/api/todos/${user.id}/todos/${params.id}`);
		setValue(res.data.name);
	};

	const updateTodo = async data => {
		try {
			const res = await Axios.patch(
				`/api/todos/${user.id}/todos/edit/${params.id}`,
				data
			);
			history.push("/dashboard");
		} catch (err) {
			setErrors(err.response.data);
		}
	};

	const handleChange = async e => {
		await setValue(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const data = {
			name: value,
		};
		updateTodo(data);
	};

	return (
		<div className="form-container">
			<h1>Edit Todo</h1>
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
				<button>Edit Todo</button>
			</form>
		</div>
	);
};

export default EditTodo;
