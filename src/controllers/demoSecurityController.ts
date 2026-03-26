import { Request, Response } from "express";
import { sequelize } from "../database/config";

// DEMO ONLY - deliberately insecure
export const demoSqlInjection = async (req: Request, res: Response) => {
  const id = req.query.id as string;

  const query = `SELECT * FROM RequestAccesses WHERE id = '${id}'`;
  const [rows] = await sequelize.query(query);

  res.json(rows);
};