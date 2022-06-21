import express from "express";
import { createUser } from "../controller/userController";

const router = express.Router();
router.route("/login").get(createUser);
export default router;
