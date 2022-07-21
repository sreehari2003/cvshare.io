//This function is to check whether the user is authenticated or not
import { NextFunction, Response, User } from "express";
import AppError from "../../utils/appError";
import catchAsync from "../../utils/catchAsync";
import jwt from "jsonwebtoken";
import { prisma } from "../index";

interface JwtPayload {
  _id: string;
}

export const isAuth = catchAsync(
  async (req: User, _res: Response, next: NextFunction) => {
    let token: string;
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return next(new AppError("user not logged in", 401));
    }
    const { _id } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    if (!_id) {
      return next(new AppError("Inavild user id please login Again", 401));
    }

    const extistingUser = await prisma.user.findUnique({
      where: {
        UID: _id,
      },
      select: {
        email: true,
        UID: true,
      },
    });
    if (extistingUser) {
      // This might throw an TS error
      req.user = extistingUser;
      next();
    } else {
      return next(new AppError("Inavild user id please login Again", 401));
    }
  }
);

// export const isCompanyAuth = catchAsync(
//   async (req: User, _res: Response, next: NextFunction) => {
//     let token: string;
//     if (
//       req.headers &&
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];
//     } else {
//       return next(new AppError("user not logged in", 401));
//     }
//     const { _id } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
//     if (!_id) {
//       return next(new AppError("Inavild user id please login Again", 401));
//     }

//     const extistingUser = await prisma.company.findUnique({
//       where: {
//         id: _id,
//       },
//       select: {
//         email: true,
//       },
//     });
//     if (extistingUser) {
//       // This might throw an TS error

//       next();
//     } else {
//       return next(new AppError("Inavild user id please login Again", 401));
//     }
//   }
// );
