import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getEnvVar } from "../helpers/getEnvVar";

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
      throw new Error("Authorization headers missing");
    }

    const [tokenType, token] = authorization.split(" ");

    if (tokenType !== "Bearer" || !token) {
      throw new Error("Invalid token format");
    }
    const tokenInfo = jwt.verify(token, JWT_SECRET);
    console.log("token info: ", tokenInfo);

    res.locals.auth = tokenInfo;

    next();
  } catch (error) {
    return console.log(error);
  }
};
