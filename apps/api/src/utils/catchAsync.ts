import { Request, Response, NextFunction } from "express";

const wrapAsync = (fun: any) =>
  function (req: Request, res: Response, next: NextFunction) {
    fun(req, res, next).catch(next);
  };
export default wrapAsync;
