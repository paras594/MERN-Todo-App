import setAuthToken from "../utils/setAuthToken";
import Axios from "axios";

export const registerUser = (userData, history, dispatch) => {
   console.log("userData", userData);
   Axios.post("/api/users/register", userData)
      .then(res => {
         history.push("/login");
      })
      .catch(err => {
         dispatch({
            type: "GET_ERRORS",
            payload: err.response.data,
         });
      });
};

export const loginUser = userData => {
   return {
      type: "SET_CURRENT_USER",
      payload: userData,
   };
};

export const setCurrentUser = decoded => {
   return {
      type: "SET_CURRENT_USER",
      payload: decoded,
   };
};

export const setLoggedIn = bool => {
   return {
      type: "SET_LOGGED_IN",
      payload: bool,
   };
};

export const logoutUser = () => {
   // remove token from local storage
   localStorage.removeItem("jwtToken");
   // remove auth header for future requests
   setAuthToken(false);
   // set current user to empty object {} which will set isAuthenticated to false
   return setCurrentUser({});
};
