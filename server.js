const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const routes = require("./routes/index.js");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");

app.use(logger("dev"));

app.use(express.urlencoded( {extended: true} ));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// port 3001 is using the index.html in the public folder
// important that routes be first, so it will go to the routes, then the public folder
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
app.use(express.static("public"));
// port 3000 uses the react routes
// with this setup, the express frontend is on port 3001
// and the react front end is on 3000
// the 3000 routes don't hit the 3001 routes

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/calendar", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
