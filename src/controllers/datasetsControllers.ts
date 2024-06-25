import { Request, Response } from "express";
import DatasetFrequency from "../database/models/DatasetFrequency";
import Frequency from "../database/models/Frequency";
import Dataset from "../database/models/Dataset";
import getDatasetsWithFrequencies from "../repositories/datasetsRepositories";
// import Dataset from "../database/models/dataset";
// import DatasetFrequency from "../database/models/datasetFrequency";

export const getAllMetadata = async (req: Request, res: Response) => {
  try {
    const metadata = await getDatasetsWithFrequencies();

    res.json({ data: metadata });
  } catch (error) {
    res.status(500);
  }
};
