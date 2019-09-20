import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser, setLoggedIn } from "../../redux/actions/authActions.js";

const Navbar = () => {
	const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
	const dispatch = useDispatch();

	useEffect(() => {}, [isLoggedIn]);

	const handleLogout = () => {
		dispatch(logoutUser());
		dispatch(setLoggedIn(false));
	};
	return (
		<nav>
			<Link to="/" className="nav-brand">
				Todo App
			</Link>
			<div className="nav-buttons">
				<Link to="/" className="button">
					Home
				</Link>
				{isLoggedIn ? (
					<button className="button" onClick={handleLogout}>
						Logout
					</button>
				) : (
					<React.Fragment>
						<Link className="button" to="/register">
							Register
						</Link>
						<Link className="button" to="/login">
							Login
						</Link>
					</React.Fragment>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
