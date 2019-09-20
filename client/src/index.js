import "./main.scss";
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import allReducers from "./redux/reducers/allReducers";

let store = createStore(allReducers);

//rendering to dom
ReactDOM.render(
	<Provider store={store}>
		<App />,
	</Provider>,
	document.querySelector(".app")
);
