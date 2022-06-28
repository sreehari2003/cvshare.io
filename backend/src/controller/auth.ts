import { serverResponse } from "../utils/response";
import appError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { prisma } from "../server/index";
import { Request, Response, NextFunction } from "express";
import { hashJwt } from "../utils/hash";

//Function to create user
export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, username, image, UID } = req.body;
    if (!name || !email || !username || !image) {
      return next(new appError("missing all required inputs", 404));
    }
    const existUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    //check if user exists
    if (existUser) {
      const token = hashJwt(existUser.UID);
      res.cookie("jwtID", token);
      res
        .status(201)
        .json(serverResponse(`welcome back ${existUser.name}`, existUser));
    }

    const result = await prisma.user.create({
      data: {
        name,
        email,
        username,
        image,
        UID,
        Education:{},
        Projects:{},
      },
    });
    const token = hashJwt(result.UID);
    res.cookie("jwtID", token);
    res.json(serverResponse("user was created", result));
  }
);

//function to update the users social
export const addSocial = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { linkedIn, github, behance, dribble, email } = req.body;
    if (!email) {
      return next(new appError("Couldnt find the user ", 401));
    }
    if (!linkedIn || !github || !dribble || !behance) {
      return next(new appError("Please provide your social Info", 404));
    }
    const result = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        social: {
          create: {
            github: github,
            behance: behance,
            dribble: dribble,
            linkedIn: linkedIn,
          },
        },
      },
    });
    res.status(200).json(serverResponse("Socials was added", result));
  }
);
