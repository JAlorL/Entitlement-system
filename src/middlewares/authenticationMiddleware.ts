import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getEnvVar } from "../helpers/getEnvVar";
import CustomError from "../types/customError";

dotenv.config();

const JWT_SECRET = getEnvVar("JWT_SECRET");

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new CustomError("Authorization headers missing", 400);
    }

    const [tokenType, token] = authorization.split(" ");

    if (tokenType !== "Bearer" || !token) {
      throw new CustomError("Invalid token format", 400);
    }
    const tokenInfo = jwt.verify(token, JWT_SECRET);
    console.log("token info: ", tokenInfo);

    res.locals.auth = tokenInfo;

    next();
  } catch (error) {
    next(error);
  }
};
