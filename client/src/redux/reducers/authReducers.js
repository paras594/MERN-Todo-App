const isEmpty = require("is-empty");

const initialState = {
   isAuthenticated: false,
   user: {},
   isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case "SET_CURRENT_USER":
         return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload,
         };
      case "SET_LOGGED_IN":
         return {
            ...state,
            isLoggedIn: action.payload,
         };
      default:
         return state;
   }
};

export default authReducer;
