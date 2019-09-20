const errorReducer = (state = {}, action) => {
	switch (action.type) {
		case "GET_ERRORS":
			return action.payload;
		default:
			return state;
	}
};

export default errorReducer;
