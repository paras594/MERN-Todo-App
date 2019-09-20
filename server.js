const express = require("express");
const users = require("./routes/api/users");
const todos = require("./routes/api/todos.js");
const passport = require("passport");
const cors = require("cors");

const app = express();

//database connection
require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(express.static("./public"));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/todos", todos);

const port = 8080;
app.listen(port, () => console.log(`listening on port: ${port}`));
