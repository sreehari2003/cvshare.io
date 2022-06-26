import express from "express";
import { createUser, addSocial } from "../controller/userController";
import { isAuth } from "../server/middleware/isAuth";
const router = express.Router();

router.route("/users").post(createUser);
router.route("/users/social").patch(isAuth, addSocial);

export default router;
