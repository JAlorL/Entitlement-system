import { Request, Response } from "express";
import getDatasetsWithFrequencies from "../repositories/datasetsRepositories";

export const getAllMetadata = async (req: Request, res: Response) => {
  try {
    const metadata = await getDatasetsWithFrequencies();

    res.json({ data: metadata });
  } catch (error) {
    res.status(500);
  }
};
