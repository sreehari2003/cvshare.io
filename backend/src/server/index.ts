import express, { Application } from "express";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import appError from "../utils/appError";
import morgan from "morgan";
import cors from "cors";
import cookieSession from "cookie-session";
import passport from "passport";

export const server: Application = express();
export const prisma = new PrismaClient();

async function main() {
  // Connect the client
  await prisma.$connect();
  console.log("Connected to Prisma and mongoDB");
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
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
server.use(express.json());
server.use(morgan("dev"));
server.use(passport.initialize());
server.use(passport.session());
//SUPERTOKEN SPECIFIC
server.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type"],
    credentials: true,
  })
);

//ALL ROUTES

server.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(
    new appError(`The requested page ${req.originalUrl} was not found`, 404)
  );
});

//global error handler
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    ok: false,
    status: err.status,
    message: err.message,
  });
});
