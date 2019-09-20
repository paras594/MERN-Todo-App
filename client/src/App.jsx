import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/private-routes/PrivateRoute";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import setAuthToken from "./redux/utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./redux/actions/authActions";
import EditTodo from "./components/EditTodo.jsx";
import TodoDetails from "./components/TodoDetails.jsx";

const App = () => {
   if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);

      const decoded = jwt_decode(token);
      const dispatch = useDispatch();

      dispatch(setCurrentUser(decoded));

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
         dispatch(logoutUser());

         window.location.href = "/login";
      }
   }

   return (
      <Router>
         <div className="app">
            <Navbar />
            {/* {localStorage.jwtToken ? <Redirect to="/dashboard" /> : null} */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <Switch>
               <PrivateRoute exact path="/dashboard" component={Dashboard} />
               <PrivateRoute exact path="/edit/:id" component={EditTodo} />
               <PrivateRoute
                  exact
                  path="/todo-details/:id"
                  component={TodoDetails}
               />
            </Switch>
         </div>
      </Router>
   );
};

export default App;
