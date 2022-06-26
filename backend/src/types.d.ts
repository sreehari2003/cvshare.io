import { Request } from "express";

declare module "express" {
  interface User extends Request {
    user: ?any;
  }
}
