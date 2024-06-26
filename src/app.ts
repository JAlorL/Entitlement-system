import express from "express";
// import * as dotenv from "dotenv";
import morgan from "morgan";
import {
  viewAllMetadata,
  viewDataPricing,
} from "./controllers/datasetsControllers";
import { authenticateUser } from "./middlewares/authenticationMiddleware";
import "./database/connection";
import {
  approveRejectRequest,
  requestAccess,
  viewPendingRequests,
} from "./controllers/requestsAccessControllers";
import { validateViewAccess } from "./middlewares/accessValidationMiddleware";
import { errorHandler } from "./helpers/errorHandler";

// dotenv.config();

// const { SERVER_PORT, SERVER_HOST } = process.env;
const app = express();

app.use(morgan("dev"));
app.use(express.json());

//ENDPOINTS
//View metadata (datasets with available frequencies)
app.get("/metadata", viewAllMetadata);

//Request access (only for Quants)
app.post("/requests", authenticateUser, requestAccess);

//Viewing pending requests (only for Ops)
app.get("/requests/pending", authenticateUser, viewPendingRequests);

//Aprove or reject request (only for Ops)
app.patch("/requests/:requestAccessId", authenticateUser, approveRejectRequest);

//View Pricing (only for Quants with granted access)
app.get("/datasets", authenticateUser, validateViewAccess, viewDataPricing);

app.use(errorHandler);

// const server = app.listen(SERVER_PORT, () =>
//   console.log(`Server listening at ${SERVER_HOST}: ${SERVER_PORT}`)
// );

export default app;
// export { server };
