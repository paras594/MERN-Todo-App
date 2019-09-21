import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setLoggedIn } from "../../redux/actions/authActions";
import Axios from "axios";
import setAuthToken from "../../redux/utils/setAuthToken";
import jwt_decode from "jwt-decode";

const Login = props => {
   const [state, setState] = useState({
      email: "",
      password: "",
   });
   const [errors, setErrors] = useState({});
   const dispatch = useDispatch();

   const isAuth = useSelector(state => state.auth.isAuthenticated);
   // const isLoggedIn = useSelector(state => state.auth);

   useEffect(() => {
      setState({
         email: "",
         password: "",
      });
      if (isAuth) {
         props.history.push("/dashboard");
         dispatch(setLoggedIn(true));
      }
   }, [isAuth]);

   const handleChange = async e => {
      await setState({
         ...state,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = e => {
      e.preventDefault();
      const userData = {
         email: state.email,
         password: state.password,
      };

      Axios.post("/api/users/login", userData)
         .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);

            setAuthToken(token);

            const decoded = jwt_decode(token);
            dispatch(loginUser(decoded));
            dispatch(setLoggedIn(true));
         })
         .catch(err => {
            setErrors(err.response.data);
         });
   };

   return (
      <div className="form-container">
         <h1>Login Here</h1>

         <form onSubmit={handleSubmit}>
            <input
               onChange={handleChange}
               value={state.email}
               name="email"
               id="email"
               type="email"
               placeholder="Email"
            />
            <p className="input-error">
               {errors.email || errors.emailNotFound}
            </p>
            <input
               onChange={handleChange}
               value={state.password}
               name="password"
               id="password"
               type="password"
               autocomplete="new-password"
               placeholder="Password"
            />
            <p className="input-error">
               {errors.password || errors.passwordIncorrect}
            </p>
            <button type="submit">Login</button>
         </form>
      </div>
   );
};

export default Login;
