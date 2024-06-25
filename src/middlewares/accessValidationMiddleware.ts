import { NextFunction, Request, Response } from "express";
import { findRequest } from "../repositories/requestsAccessRepositories";

export const validateViewAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, role } = res.locals.auth;
    const { datasetId, freqId } = req.body;

    if (role !== "quant") {
      throw new Error("You need a quant role to access this data");
    }
    if (!datasetId || !freqId) {
      throw new Error("You must select a dataset and a frequency");
    }
    const requestAccessInfo = await findRequest(id, datasetId, freqId);
    if (!requestAccessInfo || requestAccessInfo.length === 0) {
      throw new Error(
        "There is not request available with the dataset and frequency selected"
      );
    }

    if (!requestAccessInfo[0].status) {
      throw new Error("You do not have access to view Dataset Pricing");
    }
    console.log("findrequest inf:", requestAccessInfo[0].status);

    next();
  } catch (error) {
    return console.log(error);
  }
};
