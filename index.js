//INITIALIZATION
const express = require ('express');
const morgan = require ('morgan');
const app= express();
const path = require ('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require ('connect-flash');
const passport=require('passport');

require('./database');
require('./config/passport');

// SETTINGS
app.set('port',process.env.PORT||3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "mysecretbakery",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
/* old app
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: config.MONGODB_URI }),
  })
);
*/

// GLOBAL VARIABLES 
app.use((req, res, next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg =req.flash('error_msg');
  res.locals.error =req.flash('error');//passport errors
  res.locals.user = req.user||null;
  if (req.user){
  const {name, email, id}= req.user||null;
  //console.log("fullname:",{name, email});
  const avatar={name, email, id};
  console.log("avatar.name:",avatar.name);
  res.locals.avatarname = avatar.name;
  res.locals.avataremail = avatar.email;
  res.locals.avatarid = avatar.id;
  }
  next ();
});


// ROUTES
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/notes.routes'));


// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/img")));
app.use(express.static(path.join(__dirname, "public/css")));


// LISTENING MESSAGES
app.listen(app.get("port"));
console.log("Server on port", app.get("port"));

// Test a route (before we create all routes in folder )
app.get('/', (req, res) => {   // Default route when User requests the website
  res.render('index')          // Respond displaying "index" in browser
})

//    index [homepage]
//    about

//    ./users/signup
//    ./users/signin

//    ./notes/new-note
//    ./notes/all-notes
//    ./notes/edit-note
