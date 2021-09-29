//import express from "express";
const express = require ('express');
const app= express();

/*
//*import exphbs from "express-handlebars";
const expresshandlebars = require('express-handlebars');
const exphbs= expresshandlebars();
//*import path from "path";
const path = require ('path');
//import session from "express-session";
const session =require('express-session');
//import methodOverride from "method-override";
const methodOverride =require('method-override');
//import flash from "connect-flash";
const flash=require('connect-flash');
//import passport from "passport";
const passport=require('passport');
//import morgan from "morgan";
const morgan=require('morgan');
//import MongoStore from "connect-mongo";
const MongoStore=require('connect-mongo');

//import { createAdminUser } from "./libs/createUser";
//import { createAdminUser } from "./libs/createUser";
const createAdminUser = async () => {
  const userFound = await User.findOne({ email: "admin@localhost" });

  if (userFound) return;

  const newUser = new User({
    username: "admin",
    email: "admin@localhost",
  });

  newUser.password = await newUser.encryptPassword("adminpassword");
  const admin = await newUser.save();
  console.log("Admin user created", admin);
};

//import config from "./config";
//import config from "./config"; //old line
//const config=require('./config');//new unecessary line
//moved from ./config
// Read environment variables
//import { config } from "dotenv";
const {config} =require('dotenv');
config();

const configurations = {
  PORT: process.env.PORT || 4000,
  MONGODB_HOST: process.env.MONGODB_HOST || "localhost",
  MONGODB_DATABASE: process.env.MONGODB_DB || "notes-app",
  MONGODB_URI: `mongodb://${process.env.MONGODB_HOST || "localhost"}/${
    process.env.MONGODB_DATABASE || "notes-app"
  }`,
};

//export default configurations;



//import indexRoutes from "./routes/index.routes";
//import notesRoutes from "./routes/notes.routes";
//import userRoutes from "./routes/users.routes";
const indexRoutes=require('./routes/index.routes');
const notesRoutes =require('./routes/notes.routes');
const userRoutes=require('./routes/users.routes');



//import "./config/passport";
const passport=require('./config/passport');

// Initializations
//const app = express();
createAdminUser();

// settings
app.set("port", config.PORT);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: config.MONGODB_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// routes
app.use(indexRoutes);
app.use(userRoutes);
app.use(notesRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.render("404");
});

//export default app;
*/

// static files
app.use(express.static(path.join(__dirname, "public")));

module.exports.app = app;

