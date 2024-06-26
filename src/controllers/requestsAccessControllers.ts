import { NextFunction, Request, Response } from "express";
import {
  findRequest,
  findRequestById,
  getPendingRequests,
  makeRequest,
  updateRequestStatus,
} from "../repositories/requestsAccessRepositories";
import { getDataPairById } from "../repositories/datasetsRepositories";
import CustomError from "../types/customError";

export const requestAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, role } = res.locals.auth;
    const { datasetId, freqId } = req.body;

    if (role !== "quant") {
      throw new CustomError("You need a quant role to make a request", 403);
    }
    if (!datasetId || !freqId) {
      throw new CustomError("You must select a dataset and a frequency", 400);
    }
    const dataPair = await getDataPairById(datasetId, freqId);
    if (!dataPair || dataPair.length === 0) {
      throw new CustomError(
        "The combination of dataset and frequency you are requesting is not available",
        400
      );
    }
   
    const existingRequest = await findRequest(id, datasetId, freqId);
    if (existingRequest.length !== 0) {
      throw new CustomError(
        "You have already made a request for this dataset and frequency",
        400
      );
    }
    const data = await makeRequest(id, datasetId, freqId);

    res.status(201).send({
      status: "ok",
      message: "You have successfully made a request",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const viewPendingRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = res.locals.auth;
    if (role !== "ops") {
      throw new CustomError(
        "You do not have the right permission to see pending requests",
        403
      );
    }
    const data = await getPendingRequests();

    res.status(201).send({
      status: "ok",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const approveRejectRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = res.locals.auth;
    const { requestAccessId } = req.params;
    const { access } = req.body;

    if (role !== "ops") {
      throw new CustomError(
        "You do not have the permission to approve or reject the request",
        403
      );
    }
    let status: boolean;
    if (access === "approve") {
      status = true;
    } else if (access === "reject") {
      status = false;
    } else
      throw new CustomError(
        `Your access value must be 'approve' or 'reject`,
        400
      );

    const requestAccessInfo = await findRequestById(requestAccessId);
    if (requestAccessInfo.length === 0) {
      throw new CustomError("The request access id is not valid", 400);
    }

    await updateRequestStatus(requestAccessId, status);

    res.status(201).send({
      status: "ok",
      message: "You have updated the request",
    });
  } catch (error) {
    next(error);
  }
};
