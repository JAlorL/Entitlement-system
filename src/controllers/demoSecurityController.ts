import { Request, Response } from "express";

// DEMO ONLY - deliberately unsafe
export const demoEval = async (req: Request, res: Response) => {
  const expression = req.query.expression as string;
  const result = eval(expression);
  res.json({ result });
};