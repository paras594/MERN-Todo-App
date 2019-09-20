const express = require("express");
const router = express.Router();
const Todo = require("../../models/TodoSchema.js");
const User = require("../../models/UserSchema.js");

const validateTodoInput = require("../../validation/todoValidation.js");

router.get("/:user/todos/:id", (req, res) => {
	User.findOne({ _id: req.params.user }).then(user => {
		if (!user) {
			return res.status(400).json({ message: "user does not exist" });
		} else {
			Todo.findOne({ _id: req.params.id, user: req.params.user })
				.then(todo => {
					res.json(todo);
				})
				.catch(err => {
					return res.status(400).json({ err });
				});
		}
	});
});

router.get("/:user/todos", (req, res) => {
	Todo.find({ user: req.params.user }).then(todos => {
		res.json(todos);
	});
});

router.post("/:user/todos/add-todo", (req, res) => {
	const { errors, isValid } = validateTodoInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ _id: req.params.user }).then(user => {
		if (!user) {
			return res.status(400).json({ message: "user does not exist" });
		} else {
			const newTodo = new Todo({
				name: req.body.name,
				user: user.id
			});

			newTodo
				.save()
				.then(todo => res.json({ success: true }))
				.catch(err => console.log(err));
		}
	});
});

router.patch("/:user/todos/edit/:id", (req, res) => {
	const { errors, isValid } = validateTodoInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ _id: req.params.user }).then(user => {
		if (!user) {
			return res.status(400).json({ message: "user does not exist" });
		} else {
			Todo.updateOne(
				{ _id: req.params.id },
				{
					$set: {
						name: req.body.name
					}
				}
			)
				.then(todo => {
					res.json({ success: true });
				})
				.catch(err => {
					res.json({ err });
				});
		}
	});
});

router.delete("/:user/todos/delete/:id", (req, res) => {
	User.findOne({ _id: req.params.user }).then(user => {
		if (!user) {
			return res.status(400).json({ message: "user does not exist" });
		} else {
			Todo.deleteOne({ _id: req.params.id })
				.then(todo => {
					res.json({ success: true });
				})
				.catch(err => {
					res.json({ err });
				});
		}
	});
});

module.exports = router;
