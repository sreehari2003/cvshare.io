import { Request, Response, NextFunction } from 'express';
import { serverResponse } from '../utils/response';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import { prisma } from '../server/index';
import { hashJwt } from '../utils/hash';

export const createCompany = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, website, name, logo } = req.body;

  if (!email) {
    return next(new AppError('Please provide an email', 401));
  }
  const isExist = await prisma.company.findUnique({
    where: { email },
  });
  if (isExist) {
    return next(new AppError('Company already exists, please login', 404));
  }

  if (!website || !logo || !name) {
    return next(new AppError('Please provide all the required parameters', 401));
  }
  const dbResponse = await prisma.company.create({
    data: {
      email,
      website,
      logo,
      name,
    },
  });
  const hashedId = hashJwt(dbResponse.id);

  res.cookie('jwtComp', hashedId);
  // UID for each company for their web setup
  res.cookie('UID', dbResponse.id);
  res.status(201).json(serverResponse('company was created successfully', dbResponse));
});

export const companyLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError('Please provide an email', 401));
  }
  const company = await prisma.company.findUnique({
    where: {
      email,
    },
  });
  if (!company) {
    return next(new AppError('Company already exists, please login', 404));
  }
  // STEP 1
  // need to send the email to company  with a api url to validate user

  res.status(200).json(serverResponse(`Welcome back ${company.name}`, company));
});
