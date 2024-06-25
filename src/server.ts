import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import { getAllMetadata } from "./controllers/datasetsControllers";
import { authenticateUser } from "./middlewares/authenticationMiddleware";
import "./database/connection";
import TestUser from "./database/models/User";
// import TestRequest from "./database/TestRequest";
import TestDataset from "./database/models/Dataset";

dotenv.config();

const { SERVER_PORT, SERVER_HOST } = process.env;
const app = express();

app.use(morgan("dev"));
app.use(express.json());

//ENDPOINTS
//View metadata
app.get("/metadata", getAllMetadata);

//Request access (Quant)
app.post("/requests", async (req, res) => {
  const request = await TestUser.create(req.body);
  return res.status(201).json({ request, message: "created" });
});

//Viewing pending requests (Ops)
app.get("requests/pending");

//Aprove or reject request (Ops)
app.post("requests/:request_id");

//View Pricing
app.get("datasets/:dataset_id");

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello response!");
});

app.listen(SERVER_PORT, () =>
  console.log(`Server listening at ${SERVER_HOST}: ${SERVER_PORT}`)
);
