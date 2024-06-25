import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB,
  dialect: "postgres",
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  models: [__dirname + "/models"],
  logging: false,
});

export default sequelize;
