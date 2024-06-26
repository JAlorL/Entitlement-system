import request from "supertest";
import app, { server } from "../server";
import * as datasetsRepositories from "../repositories/datasetsRepositories";
import * as requestsAccessRepositories from "../repositories/requestsAccessRepositories";
import jwt from "jsonwebtoken";

jest.mock("../helpers/getEnvVar", () => ({
  getEnvVar: jest.fn(() => "mock-secret"),
}));
jest.mock("../repositories/datasetsRepositories", () => ({
  getDataPairById: jest.fn(),
}));
jest.mock("../repositories/requestsAccessRepositories", () => ({
  findRequest: jest.fn(),
  makeRequest: jest.fn(),
  getPendingRequests: jest.fn(),
  findRequestById: jest.fn(),
  updateRequestStatus: jest.fn(),
}));

describe("By calling the endpoint: POST /requests, a Quant user can request access to view pricing of a dataset with an available frequency", () => {
  beforeAll(() => {
    jest.spyOn(jwt, "verify").mockImplementation(() => ({
      id: "1",
      role: "quant",
    }));
    (datasetsRepositories.getDataPairById as jest.Mock).mockResolvedValue([
      { dataset_id: "1", frequency_id: "1" },
    ]);
    (requestsAccessRepositories.findRequest as jest.Mock).mockResolvedValue([]);
    (requestsAccessRepositories.makeRequest as jest.Mock).mockResolvedValue({
      id: "1",
      user_id: "1",
      dataset_id: "1",
      frequency_id: "1",
      status: null,
    });
  });

  it("should create a new access request and return the data of that access request", async () => {
    const res = await request(app)
      .post("/requests")
      .set("Authorization", "Bearer mock-token")
      .send({ datasetId: "1", freqId: "1" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: "ok",
        message: "You have successfully made a request",
        data: expect.objectContaining({
          id: expect.any(String),
          user_id: expect.any(String),
          dataset_id: expect.any(String),
          frequency_id: expect.any(String),
          status: null,
        }),
      })
    );
  });

  afterAll((done) => {
    server.close(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
      done();
    });
  });
});
