const Validator = require("validator");
const isEmpty = require("is-empty");

const validateTodoInput = data => {
	let errors = {};

	// convert empty fields to an empty string so we can use validator functions
	data.name = !isEmpty(data.name) ? data.name : "";

	// name check
	if (Validator.isEmpty(data.name)) {
		errors.name = "Todo is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = validateTodoInput;


