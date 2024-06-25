import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import { viewAllMetadata } from "./controllers/datasetsControllers";
import { authenticateUser } from "./middlewares/authenticationMiddleware";
import "./database/connection";
import {
  approveRejectRequest,
  requestAccess,
  viewPendingRequests,
} from "./controllers/requestsAccessControllers";

dotenv.config();

const { SERVER_PORT, SERVER_HOST } = process.env;
const app = express();

app.use(morgan("dev"));
app.use(express.json());

//ENDPOINTS
//View metadata
app.get("/metadata", viewAllMetadata);

//Request access (Quant)
app.post("/requests", authenticateUser, requestAccess);

//Viewing pending requests (Ops)
app.get("/requests/pending", authenticateUser, viewPendingRequests);

//Aprove or reject request (Ops)
app.patch("/requests/:requestAccessId", authenticateUser, approveRejectRequest );

//View Pricing
app.get("/datasets/:dataset_id");

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello response!");
});

app.listen(SERVER_PORT, () =>
  console.log(`Server listening at ${SERVER_HOST}: ${SERVER_PORT}`)
);
