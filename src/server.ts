import app from "./app";
import * as dotenv from "dotenv";

dotenv.config();

const { SERVER_PORT, SERVER_HOST } = process.env;

export const server = app.listen(SERVER_PORT, () =>
  console.log(`Server listening at ${SERVER_HOST}: ${SERVER_PORT}`)
);
