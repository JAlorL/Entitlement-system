import { Request, Response } from "express";
import {
  findRequest,
  findRequestById,
  getPendingRequests,
  makeRequest,
  updateRequestStatus,
} from "../repositories/requestsAccessRepositories";
import { getDataPairById } from "../repositories/datasetsRepositories";

export const requestAccess = async (req: Request, res: Response) => {
  try {
    const { id, role } = res.locals.auth;
    const { datasetId, freqId } = req.body;

    if (role !== "quant") {
      throw new Error("You need a quant role to make a request");
    }
    if (!datasetId || !freqId) {
      throw new Error("You must select a dataset and a frequency");
    }
    const dataPair = await getDataPairById(datasetId, freqId);
    if (!dataPair || dataPair.length === 0) {
      throw new Error(
        "The combination of dataset and frequency you are requesting is not available"
      );
    }
    console.log("dataPair recieved", dataPair);
    const existingRequest = await findRequest(id, datasetId, freqId);
    if (existingRequest.length !== 0) {
      throw new Error(
        "You have already made a request for this dataset and frequency"
      );
    }
    const data = await makeRequest(id, datasetId, freqId);

    res.status(201).send({
      status: "ok",
      message: "You have successfully made a request",
      data,
    });
  } catch (error) {
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).send({ status: "error", message: errorMessage });
  }
};

export const viewPendingRequests = async (req: Request, res: Response) => {
  try {
    const { role } = res.locals.auth;
    if (role !== "ops") {
      throw new Error(
        "You do not have the right permission to see pending requests"
      );
    }
    const data = await getPendingRequests();

    res.status(201).send({
      status: "ok",
      data,
    });
  } catch (error) {
    res.status(500);
  }
};

export const approveRejectRequest = async (req: Request, res: Response) => {
  try {
    const { role } = res.locals.auth;
    const { requestAccessId } = req.params;
    const { access } = req.body;

    if (role !== "ops") {
      throw new Error(
        "You do not have the permission to approve or reject the request"
      );
    }
    let status: boolean;
    if (access === "approve") {
      status = true;
    } else if (access === "reject") {
      status = false;
    } else throw new Error(`Your access value must be 'approve' or 'reject`);

    const requestAccessInfo = await findRequestById(requestAccessId);
    if (requestAccessInfo.length === 0) {
      throw new Error("The request access id is not valid");
    }

    await updateRequestStatus(requestAccessId, status);

    res.status(201).send({
      status: "ok",
      message: "You have updated the request",
    });
  } catch (error) {
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).send({ status: "error", message: errorMessage });
  }
};
