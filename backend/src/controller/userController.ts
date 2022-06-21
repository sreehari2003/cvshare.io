import { serverResponse } from "../utils/response";
import appError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { prisma } from "../server/index";
import { Request, Response, NextFunction } from "express";

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, username, image, UID } = req.body;
    if (!name || !email || !username || !image) {
      return next(new appError("missing all required inputs", 404));
    }
    const result = await prisma.user.create({
      data: {
        name,
        email,
        username,
        image,
        UID,
      },
    });

    res.json(serverResponse("user was created", result));
  }
);
