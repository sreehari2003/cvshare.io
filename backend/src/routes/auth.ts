import express from "express";
import { createCompany, companyLogin } from "../controller/company";
import {
  addEducation,
  deleteUser,
  getAllUsers,
  updateUserName,
} from "../controller/user";
import { createUser, addSocial, handleJWTValidation } from "../controller/auth";
import { isAuth } from "../server/middleware/isAuth";
const router = express.Router();

router.route("/jwt").post(isAuth, handleJWTValidation);
router.route("/users").get(getAllUsers).post(createUser).delete(deleteUser);
router.route("/users/social").patch(isAuth, addSocial);
router.route("/users/education").patch(isAuth, addEducation);
router.route("/users/username").patch(isAuth, updateUserName);
//company
router.route("/company/signup").post(createCompany);
router.route("/company/login").post(companyLogin);

export default router;
