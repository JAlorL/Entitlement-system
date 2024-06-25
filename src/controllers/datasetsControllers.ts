import { Request, Response } from "express";
import { getDatasetsWithFrequencies } from "../repositories/datasetsRepositories";
import { findRequest } from "../repositories/requestsAccessRepositories";

export const viewAllMetadata = async (req: Request, res: Response) => {
  try {
    const metadata = await getDatasetsWithFrequencies();

    res.status(201).send({ status: "ok", data: metadata });
  } catch (error) {
    res.status(500);
  }
};

export const viewDataPricing = async (req: Request, res: Response) => {
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
    console.log("findrequest inf:", requestAccessInfo[0].status);

    res.status(201).send({
      status: "ok",

      data: { status: requestAccessInfo[0].status },
    });
  } catch (error) {
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).send({ status: "error", message: errorMessage });
  }
};
