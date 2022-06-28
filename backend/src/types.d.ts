import { Request } from "express";
import { prisma } from "./server/index";
import { UserObj } from "./types/user";
declare module "express" {
  interface User extends Request {
    user: UserObj;
  }
}
