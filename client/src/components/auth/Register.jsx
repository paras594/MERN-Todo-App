import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { registerUser } from "../../redux/actions/authActions";
import Axios from "axios";

const Register = props => {
   const [state, setState] = useState({
      name: "",
      email: "",
      password: "",
      password2: "",
   });

   const [errors, setErrors] = useState({});

   // const dispatch = useDispatch();
   const isAuth = useSelector(state => state.auth.isAuthenticated);
   // const getErrors = useSelector(state => state.errors);

   useEffect(() => {
      setState({
         name: "",
         email: "",
         password: "",
         password2: "",
      });
   }, []);

   if (isAuth) {
      props.history.push("/dashboard");
   }

   const handleChange = async e => {
      await setState({
         ...state,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = e => {
      e.preventDefault();
      const newUser = {
         name: state.name,
         email: state.email,
         password: state.password,
         password2: state.password2,
      };

      Axios.post("/api/users/register", newUser)
         .then(res => {
            props.history.push("/login");
         })
         .catch(err => {
            // dispatch({
            //    type: "GET_ERRORS",
            //    payload: err.response.data,
            // });

            setErrors(err.response.data);
         });
   };

   return (
      <div className="form-container">
         <h1>Register Here</h1>

         <form onSubmit={handleSubmit}>
            <input
               onChange={handleChange}
               value={state.name}
               name="name"
               id="name"
               type="text"
               placeholder="name here"
            />
            <p className="input-error">{errors.name}</p>
            <input
               onChange={handleChange}
               value={state.email}
               name="email"
               id="email"
               type="email"
               placeholder="email here"
            />
            <p className="input-error">{errors.email || errors.message}</p>
            <input
               onChange={handleChange}
               value={state.password}
               name="password"
               id="password"
               type="password"
               autocomplete="new-password"
               placeholder="password"
            />
            <p className="input-error">{errors.password}</p>
            <input
               onChange={handleChange}
               name="password2"
               id="password2"
               value={state.password2}
               type="password"
               autocomplete="new-password"
               placeholder="confirm password"
            />
            <p className="input-error">{errors.password2}</p>
            <button type="submit">Register</button>
         </form>
      </div>
   );
};

export default Register;
