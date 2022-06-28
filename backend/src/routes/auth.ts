import express from "express";
import { createCompany } from "src/controller/company";
import { createUser, addSocial } from "../controller/auth";
import { isAuth } from "../server/middleware/isAuth";
const router = express.Router();

router.route("/users").post(createUser);
router.route("/users/social").patch(isAuth, addSocial);
//company
router.route("/company").post(createCompany);

export default router;
