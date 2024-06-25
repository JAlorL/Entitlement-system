import { Request, Response } from "express";
import { getDatasetsWithFrequencies } from "../repositories/datasetsRepositories";

export const viewAllMetadata = async (req: Request, res: Response) => {
  try {
    const metadata = await getDatasetsWithFrequencies();

    res.status(201).send({ status: "ok", data: metadata });
  } catch (error) {
    res.status(500);
  }
};
