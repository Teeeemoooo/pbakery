// we'll use local authentication (vs. Google, Facebook, Tweeter... etc)
//import passport from "passport";
const passport=require('passport');

//import { Strategy as LocalStrategy } from "passport-local";
const LocalStrategy=require('passport-local').Strategy;

//import User from "../models/User";
const User =require('../models/User');
//User!=user 

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await User.findOne({ email: email }); //CAPS user
 
      if (!user) {
        return done(null, false, { message: "Not User found." });
      } else {
        // Match Password's User
        //User!=user method is of the instance (Vs. User's) 
        const match = await user.matchPassword(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password." });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
