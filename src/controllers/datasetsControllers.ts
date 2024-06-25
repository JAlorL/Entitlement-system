import { Request, Response } from "express";
import { getDatasetsWithFrequencies } from "../repositories/datasetsRepositories";
import { getPricingData } from "../helpers/fetchExternalApi";
import Dataset from "../database/models/Dataset";
import Frequency from "../database/models/Frequency";
import { formatFrequency } from "../helpers/formatFrequency";

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
    const { datasetId, freqId } = req.body;
    const [{ name: datasetName }] = await Dataset.findAll({
      where: { id: datasetId },
      attributes: ["name"],
      raw: true,
    });

    const [{ frequency }] = await Frequency.findAll({
      where: { id: freqId },
      attributes: ["frequency"],
      raw: true,
    });

    const formattedFrequency = formatFrequency(frequency);
    const pricingData = await getPricingData(datasetName, formattedFrequency);

    res.status(201).send({
      status: "ok",
      data: pricingData,
    });
  } catch (error) {
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).send({ status: "error", message: errorMessage });
  }
};
