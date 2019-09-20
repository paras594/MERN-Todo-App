import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";

const TodoDetails = ({ match: { params } }) => {
	const [todo, setTodo] = useState({});
	const user = useSelector(state => state.auth.user);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		let res = await Axios.get(`/api/todos/${user.id}/todos/${params.id}`);
		setTodo(res.data);
	};

	return (
		<div className="details">
			<h1>Details</h1>
			<hr />
			<p>Name : {todo.name}</p>
			<p>Created by {user.name}</p>
			<p>
				Created on{" "}
				{moment(todo.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
			</p>
		</div>
	);
};

export default TodoDetails;
