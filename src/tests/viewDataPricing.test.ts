import request from "supertest";
import { server } from "../server";
import app from "../app";
import * as requestsAccessRepositories from "../repositories/requestsAccessRepositories";
import * as fetchExternalApi from "../helpers/fetchExternalApi";
import jwt from "jsonwebtoken";

jest.mock("../helpers/getEnvVar", () => ({
  getEnvVar: jest.fn(() => "mock-secret"),
}));

jest.mock("../repositories/requestsAccessRepositories", () => ({
  findRequest: jest.fn(),
}));

jest.mock("../helpers/fetchExternalApi", () => ({
  getPricingData: jest.fn(),
}));

describe("By calling GET /datasets, a quant with granted access is able to view the datasets including pricing for the requested frequency", () => {
  beforeAll(() => {
    jest.spyOn(jwt, "verify").mockImplementation(() => ({
      id: "1",
      role: "quant",
    }));

    (requestsAccessRepositories.findRequest as jest.Mock).mockResolvedValue([
      {
        id: "1",
        user_id: "1",
        dataset_id: "1",
        frequency_id: "1",
        status: true,
      },
    ]);

    (fetchExternalApi.getPricingData as jest.Mock).mockResolvedValue([
      {
        priceUsd: "10000",
        time: 1622505600000,
        date: "2021-06-01T00:00:00.000Z",
      },
      {
        priceUsd: "20000",
        time: 1625097600000,
        date: "2021-07-01T00:00:00.000Z",
      },
    ]);
  });

  it("should return pricing data for the dataset and frequency", async () => {
    const res = await request(app)
      .get("/datasets")
      .set("Authorization", "Bearer mock-token")
      .send({ datasetId: "1", freqId: "1" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: "ok",
        data: expect.arrayContaining([
          expect.objectContaining({
            priceUsd: expect.any(String),
            time: expect.any(Number),
            date: expect.any(String),
          }),
        ]),
      })
    );
  });

  afterAll(async () => {
    await server.close(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });
  });
});
