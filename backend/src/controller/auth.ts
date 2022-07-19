import { serverResponse } from "../utils/response";
import appError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { prisma } from "../server/index";
import { Request, Response, NextFunction } from "express";
import { hashJwt } from "../utils/hash";

//Function to create user
export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, image, UID } = req.body;
    if (!name || !email || !image || !UID) {
      return next(new appError("Missing all the required inputs", 404));
    }
    // NEED TO CHANGE THIS FOR UNIQUE USERS NAME WHEN WE SCALE
    let username: string = req.body.username;
    if (!username) {
      username = email;
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
        .json(serverResponse(`Welcome back ${existUser.name}`, existUser));
    }

    const result = await prisma.user.create({
      data: {
        name,
        email,
        username,
        image,
        UID,
        Education: {},
        Projects: {},
      },
    });
    const token = hashJwt(result.UID);
    res.cookie("jwtID", token);
    res.json(serverResponse("User was created", result));
  }
);

//function to update the users social
export const addSocial = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { linkedIn, github, behance, dribble, email } = req.body;
    if (!email) {
      return next(new appError("Couldn't find the user ", 401));
    }
    if (!linkedIn || !github || !dribble || !behance) {
      return next(new appError("Please provide your social info", 404));
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
    res.status(200).json(serverResponse("Socials were added", result));
  }
);

//Function to validate the JWT
export const handleJWTValidation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // If the function is called, then it means no error was presented in the isAuth middleware
    res.status(200).json(serverResponse("You are authenticated", null));
  }
);
