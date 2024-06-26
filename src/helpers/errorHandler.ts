import { Request, Response, NextFunction } from "express";
import CustomError from "../types/customError";

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  res.status(error.statusCode || 500).send({
    status: "error",
    message: error.message,
  });
};
