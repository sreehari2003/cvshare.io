import express from "express";
import { createCompany } from "../controller/company";
import { addEducation, deleteUser, getAllUsers } from "../controller/user";
import { createUser, addSocial } from "../controller/auth";
import { isAuth } from "../server/middleware/isAuth";
const router = express.Router();

router.route("/users").get(getAllUsers).post(createUser).delete(deleteUser);
router.route("/users/social").patch(isAuth, addSocial);
router.route("/users/education").patch(isAuth, addEducation);
//company
router.route("/company").post(createCompany);

export default router;
