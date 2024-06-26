import { NextFunction, Request, Response } from "express";
import { findRequest } from "../repositories/requestsAccessRepositories";
import CustomError from "../types/customError";

export const validateViewAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, role } = res.locals.auth;
    const { datasetId, freqId } = req.body;

    if (role !== "quant") {
      throw new CustomError("You need a quant role to access this data", 403);
    }
    if (!datasetId || !freqId) {
      throw new CustomError("You must select a dataset and a frequency", 400);
    }
    const requestAccessInfo = await findRequest(id, datasetId, freqId);
    if (!requestAccessInfo || requestAccessInfo.length === 0) {
      throw new CustomError(
        "There is not request available with the dataset and frequency selected",
        404
      );
    }

    if (!requestAccessInfo[0].status) {
      throw new CustomError(
        "You do not have access to view Dataset Pricing",
        403
      );
    }
    console.log("findrequest inf:", requestAccessInfo[0].status);

    next();
  } catch (error) {
    next(error);
  }
};
