import express, { Application, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

import morgan from 'morgan';
import cors from 'cors';
import AppError from '../utils/appError';
import authRoutes from '../routes/auth';

export const server: Application = express();
export const prisma = new PrismaClient();

async function main() {
  // Connect the client
  await prisma.$connect();
  // eslint-disable-next-line no-console
  console.log('Connected to Prisma and mongoDB');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// global
server.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  })
);
server.use(express.json());
server.use(morgan('dev'));
// Routes Registration
server.use('/auth', authRoutes);

server.all('*', (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`The requested page ${req.originalUrl} was not found`, 404));
});

// global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
server.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  // eslint-disable-next-line no-param-reassign
  err.statusCode = err.statusCode || 500;
  // eslint-disable-next-line no-param-reassign
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    ok: false,
    status: err.status,
    message: err.message,
  });
});
