// THIS CODE IS CURENTLY ON HOLD

// import express from "express";
// import { logIn, googleAuth, google, logOut } from "../auth/authController";

// const router = express.Router();
// router.route("/login").get(logIn);
// router.route("/google").get(google);
// router.route("/google/callback").get(googleAuth);
// router.route("/logout").get(logOut);
// export default router;

// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const passport = require("passport");

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLINETID,
//       clientSecret: process.env.CLINETSECRET,
//       callbackURL: "/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
