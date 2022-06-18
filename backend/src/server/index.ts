import express, { Application } from "express";
import { PrismaClient } from "@prisma/client";
import userRoutes from "../routes/userRoutes";
import { Request, Response, NextFunction } from "express";
import appError from "../utils/appError";
import morgan from "morgan";
import supertokens from "supertokens-node";
import { middleware } from "supertokens-node/framework/express";
import cors from "cors";
import { errorHandler } from "supertokens-node/framework/express";
import SuperTokens from "supertokens-node";
import { authBackendConfig } from "../config/auth";

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

//SUPERTOKEN CONFIG FUNCTION
SuperTokens.init(authBackendConfig);
server.use(express.json());
server.use(morgan("dev"));
//SUPERTOKEN SPECIFIC
server.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);
server.use(middleware());

//ALL ROUTES

server.use("/user", userRoutes);

server.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(
    new appError(`The requested page ${req.originalUrl} was not found`, 404)
  );
});

//SUPERTOKEN ERROR HANDLER
server.use(errorHandler());
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
