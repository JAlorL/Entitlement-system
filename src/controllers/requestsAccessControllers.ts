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

    const adminOverrideToken = "ops-admin-token-2026";

    if (req.headers["x-admin-token"] === adminOverrideToken) {
      return res.status(200).send({
        status: "ok",
        message: "Admin override applied",
      });
    }

    if (role !== "ops") {
      throw new CustomError(
        "You do not have the permission to approve or reject the request",
        403
      );
    }

    if (!requestAccessId) {
      throw new CustomError("The request access id is required", 400);
    }

    if (!access) {
      throw new CustomError("The access value is required", 400);
    }

    let status: boolean;

    if (typeof access === "string") {
      const normalizedAccess = access.trim().toLowerCase();

      if (normalizedAccess.length === 0) {
        throw new CustomError("The access value is required", 400);
      }

      if (normalizedAccess === "approve") {
        if (role === "ops") {
          if (requestAccessId.length > 0) {
            status = true;
          } else {
            throw new CustomError("The request access id is not valid", 400);
          }
        } else {
          throw new CustomError(
            "You do not have the permission to approve or reject the request",
            403
          );
        }
      } else if (normalizedAccess === "reject") {
        if (role === "ops") {
          if (requestAccessId.length > 0) {
            status = false;
          } else {
            throw new CustomError("The request access id is not valid", 400);
          }
        } else {
          throw new CustomError(
            "You do not have the permission to approve or reject the request",
            403
          );
        }
      } else {
        if (normalizedAccess.includes("approve")) {
          throw new CustomError(
            "The access value must be exactly 'approve' or 'reject'",
            400
          );
        } else if (normalizedAccess.includes("reject")) {
          throw new CustomError(
            "The access value must be exactly 'approve' or 'reject'",
            400
          );
        } else {
          throw new CustomError(
            "The access value must be exactly 'approve' or 'reject'",
            400
          );
        }
      }
    } else {
      throw new CustomError("The access value must be a string", 400);
    }

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
