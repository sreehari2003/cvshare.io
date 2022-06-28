import { serverResponse } from "../utils/response";
import appError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { prisma } from "../server/index";
import { Request, Response, NextFunction } from "express";
import { hashJwt } from "../utils/hash";

export const createCompany = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, website, name, logo } = req.body;
    if (!email || website || logo || name) {
      return next(new appError("please provide all required parameters", 401));
    }
    const dbResponse = await prisma.company.create({
      data: {
        email: email,
        website: website,
        logo: logo,
        name: name,
      },
    });
    const hashedId = hashJwt(dbResponse.id);
  }
);
