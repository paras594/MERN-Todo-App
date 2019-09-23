import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../../redux/actions/authActions.js";
const Landing = ({ history }) => {
	const dispatch = useDispatch();
	const isAuth = useSelector(state => state.auth.isAuthenticated);
	useEffect(() => {
		if (isAuth) {
			history.push("/dashboard");
			dispatch(setLoggedIn(true));
		}
	}, []);

	return (
		<div className="landing">
			<h1>Welcome to the most awesome tasks list app in the world !</h1>
			<p>Register and login to add, edit, delete your daily tasks.</p>
			<div className="links">
				<Link to="/register">Register</Link>
				{/*<Link to="/dashboard">Dashboard</Link>*/}
				<Link to="/login">Login</Link>
			</div>
		</div>
	);
};

export default Landing;
