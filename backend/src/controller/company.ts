import { serverResponse } from "../utils/response";
import appError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { prisma } from "../server/index";
import { Request, Response, NextFunction } from "express";
import { hashJwt } from "../utils/hash";

export const createCompany = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, website, name, logo } = req.body;

    if (!email) {
      return next(new appError("Please provide an email", 401));
    }
    const isExist = await prisma.company.findUnique({
      where: { email: email },
    });
    if (isExist) {
      return next(new appError("Company already exists, please login", 404));
    }

    if (!website || !logo || !name) {
      return next(
        new appError("Please provide all the required parameters", 401)
      );
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

    res.cookie("jwtComp", hashedId);
    // UID for each company for their web setup
    res.cookie("UID", dbResponse.id);
    res
      .status(201)
      .json(serverResponse("company was created successfully", dbResponse));
  }
);

export const companyLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email) {
      return next(new appError("Please provide an email", 401));
    }
    const company = await prisma.company.findUnique({
      where: {
        email: email,
      },
    });
    if (!company) {
      return next(new appError("Company already exists, please login", 404));
    }
    // STEP 1
    // need to send the email to company  with a api url to validate user

    res
      .status(200)
      .json(serverResponse(`Welcome back ${company.name}`, company));
  }
);
