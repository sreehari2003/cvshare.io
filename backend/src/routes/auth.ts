import express from "express";
import { createCompany } from "../controller/company";
import { addEducation, deleteUser } from "../controller/user";
import { createUser, addSocial } from "../controller/auth";
import { isAuth } from "../server/middleware/isAuth";
const router = express.Router();

router.route("/users").post(createUser).delete(isAuth, deleteUser);
router.route("/users/social").patch(isAuth, addSocial);
router.route("/users/education").post(isAuth, addEducation);
//company
router.route("/company").post(createCompany);

export default router;
