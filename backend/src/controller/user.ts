import { serverResponse } from "../utils/response";
import appError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { prisma } from "../server/index";
import { User, Response, NextFunction, Request } from "express";

// delete user function
export const deleteUser = catchAsync(
  async (req: User, res: Response, next: NextFunction) => {
    const user = req?.user;
    if (!user) {
      return next(new appError("User not found", 404));
    }

    const resp = await prisma.user.delete({
      where: {
        email: user.email,
      },
    });

    res.status(200).json(serverResponse("User deleted successfully", resp));
  }
);

// adding education
export const addEducation = catchAsync(
  async (req: User, res: Response, next: NextFunction) => {
    const { college, year, grade, majour } = req.body;
    if (!college || !year || !majour) {
      return next(new appError("Please provide all the required fields", 404));
    }
    const user = req?.user;
    if (!user) {
      return next(new appError("User not found", 404));
    }

    const response = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        Education: {
          create: [
            {
              college: college,
              Year: year,
              Grade: grade,
              Majour: majour,
            },
          ],
        },
      },
      select: {
        email: true,
        Education: true,
      },
    });

    res.status(201).json(serverResponse("Education was added", response));
  }
);
// updating username
export const updateUserName = catchAsync(
  async (req: User, res: Response, next: NextFunction) => {
    const user = req?.user;
    if (!user) {
      return next(new appError("User not found", 404));
    }
    const { userName } = req.body;
    if (!userName) {
      return next(new appError("No username provided", 404));
    }
    const currentUser = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        username: userName,
      },
    });
    res
      .status(201)
      .json(
        serverResponse("The username was successfully updated", currentUser)
      );
  }
);

// getting all users
export const getAllUsers = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const response = await prisma.user.findMany();
    console.log(response);
    res
      .status(201)
      .json(serverResponse("The request was successfully completed", response));
  }
);
