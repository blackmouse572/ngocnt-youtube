var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

const mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url =
  "mongodb+srv://backend_dev_account:QjFw8lrE2wB9VrqR@necterdevelopenviroment.rvxgv1x.mongodb.net/test?retryWrites=true&w=majority";

//Connect to mongodb
const connect = mongoose.connect(url);

connect
  .then((db) => {
    console.log("\n-------------------------------\n");
    console.log("CONNECTED TO DATABASE at", url);
    console.log("\n-------------------------------\n");
  })
  .catch((err) => {
    console.log(err);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
