import { Request, Response } from "express";
import {
  getPendingRequests,
  makeRequest,
} from "../repositories/requestsAccessRepositories";

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

    const data = await makeRequest(id, datasetId, freqId);

    res.status(201).send({
      status: "ok",
      message: "You have successfully made a request",
      data,
    });
  } catch (error) {
    res.status(500);
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
