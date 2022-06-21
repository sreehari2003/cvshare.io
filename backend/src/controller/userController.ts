import { serverResponse } from "../utils/response";
import appError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { prisma } from "../server/index";
import { Request, Response, NextFunction } from "express";
import { hashJwt } from "../utils/hash";

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
      },
    });
    const token = hashJwt(UID);
    res.cookie("jwtID", token);
    res.json(serverResponse("user was created", result));
  }
);
