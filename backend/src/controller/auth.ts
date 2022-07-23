import { Request, Response, NextFunction, User } from 'express';
import { serverResponse } from '../utils/response';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import { prisma } from '../server/index';
import { hashJwt } from '../utils/hash';

// Function to create user
export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, image, UID } = req.body;
  if (!name || !email || !image || !UID) {
    return next(new AppError('Missing all the required inputs', 404));
  }
  // NEED TO CHANGE THIS FOR UNIQUE USERS NAME WHEN WE SCALE
  let { username } = req.body;
  if (!username) {
    username = email;
  }
  const existUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  // check if user exists
  if (existUser) {
    const token = hashJwt(existUser.UID);
    res.cookie('jwtID', token);
    res.status(201).json(serverResponse(`Welcome back ${existUser.name}`, existUser));
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
  res.cookie('jwtID', token);
  res.json(serverResponse('User was created', result));
});

// function to update the users social
// eslint-disable-next-line consistent-return
export const addSocial = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { linkedIn, github, behance, dribble, email } = req.body;
  if (!email) {
    return next(new AppError("Couldn't find the user ", 401));
  }
  if (!linkedIn || !github || !dribble || !behance) {
    return next(new AppError('Please provide your social info', 404));
  }
  const result = await prisma.user.update({
    where: {
      email,
    },
    data: {
      social: {
        create: {
          github,
          behance,
          dribble,
          linkedIn,
        },
      },
    },
  });
  res.status(200).json(serverResponse('Socials were added', result));
});

// Function to validate the JWT
export const handleJWTValidation = catchAsync(
  async (req: User, res: Response, next: NextFunction) => {
    const user = req?.user;
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    // If the function is called, then it means no error was presented in the isAuth middleware
    res.status(200).json(serverResponse('You are authenticated', user));
  }
);
