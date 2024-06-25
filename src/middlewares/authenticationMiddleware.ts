import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "shshshsh";

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
    console.log(tokenInfo);

    res.locals.auth = tokenInfo;
    console.log(res.locals);

    next();
  } catch (error) {
    return console.log(error);
  }
};
