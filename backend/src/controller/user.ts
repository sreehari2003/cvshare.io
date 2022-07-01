import { serverResponse } from "../utils/response";
import appError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { prisma } from "../server/index";
import { User, Response, NextFunction } from "express";

export const deleteUser = catchAsync(
  async (req: User, res: Response, next: NextFunction) => {
    const user = req?.user;
    if (!user) {
      return next(new appError("user not found", 404));
    }

    await prisma.user.delete({
      where: {
        email: user.email,
      },
    });

    res.status(200).json(serverResponse("user deleted successfully", 201));
  }
);

export const addEducation = catchAsync(
  async (req: User, res: Response, next: NextFunction) => {
    const { college, year, grade, majour } = req.body;
    if (!college || !year || !majour) {
      return next(new appError("please provide all required fields", 404));
    }
    const user = req?.user;
    if (!user) {
      return next(new appError("user not found", 404));
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

    res.status(201).json(serverResponse("education was added", response));
  }
);
