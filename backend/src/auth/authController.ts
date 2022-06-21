// THIS CODE IS CURENTLY ON HOLD

// import express from "express";
// import { logIn, googleAuth, google, logOut } from "../auth/authController";

// const router = express.Router();
// router.route("/login").get(logIn);
// router.route("/google").get(google);
// router.route("/google/callback").get(googleAuth);
// router.route("/logout").get(logOut);
// export default router;

// import { Request, Response, NextFunction } from "express";
// import appError from "../utils/appError";
// import catchAsync from "../utils/catchAsync";
// import { serverResponse } from "../utils/response";
// import passport from "passport";

// const CLIENT_URL = "http://localhost:3000/";

// export const logIn = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     if (req.user) {
//       res.status(200).json(serverResponse("Login SuccessFull ", req.user));
//     } else {
//       return next(new appError("Login failed", 404));
//     }
//   }
// );
// export const google = passport.authenticate("google", { scope: ["profile"] });

// export const googleAuth = passport.authenticate("google", {
//   successRedirect: CLIENT_URL,
//   failureRedirect: "/login/failed",
// });

// export const logOut = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     req.logout(function (err) {
//       if (err) {
//         return next(err);
//       }
//       res.redirect("/");
//     });
//   }
// );
