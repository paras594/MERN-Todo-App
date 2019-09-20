import React from "react";
import { Link } from "react-router-dom";

const TodoList = ({ list, deleteTodo }) => {
	return (
		<ul className="todolist">
			{list.map(todo => (
				<li key={todo._id}>
					<Link to={`/todo-details/${todo._id}`}>{todo.name}</Link>
					<div className="actions">
						<Link to={`/edit/${todo._id}`} className="edit">
							<i className="fas fa-pen" />
						</Link>
						<button onClick={() => deleteTodo(todo._id)}>
							<i className="far fa-trash-alt" />
						</button>
					</div>
				</li>
			))}
		</ul>
	);
};

export default TodoList;
