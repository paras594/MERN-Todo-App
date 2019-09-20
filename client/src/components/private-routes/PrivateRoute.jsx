import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
   const isAuth = useSelector(state => state.auth.isAuthenticated);
   // console.log(auth);
   return (
      <Route
         {...rest}
         render={props =>
            isAuth === true ? (
               <Component {...props} />
            ) : (
               <Redirect to="/login" />
            )
         }
      />
   );
};

export default PrivateRoute;
