import request from "supertest";
import app, { server } from "../server";
import * as requestsAccessRepositories from "../repositories/requestsAccessRepositories";
import jwt from "jsonwebtoken";

jest.mock("../helpers/getEnvVar", () => ({
  getEnvVar: jest.fn(() => "mock-secret"),
}));

jest.mock("../repositories/requestsAccessRepositories", () => ({
  findRequestById: jest.fn(),
  updateRequestStatus: jest.fn(),
}));

describe("By calling PATCH /requests/:requestAccessId, an Ops user can approve or reject the quant request", () => {
  beforeAll(() => {
    jest.spyOn(jwt, "verify").mockImplementation(() => ({
      id: "2",
      role: "ops",
    }));

    (requestsAccessRepositories.findRequestById as jest.Mock).mockResolvedValue(
      [
        {
          id: "1",
          user_id: "1",
          dataset_id: "1",
          frequency_id: "1",
          status: null,
        },
      ]
    );

    (
      requestsAccessRepositories.updateRequestStatus as jest.Mock
    ).mockResolvedValue([1]);
  });

  it("should approve the request", async () => {
    const res = await request(app)
      .patch("/requests/1")
      .set("Authorization", "Bearer mock-token")
      .send({ access: "approve" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: "ok",
        message: "You have updated the request",
      })
    );
  });

  it("should reject the request", async () => {
    const res = await request(app)
      .patch("/requests/1")
      .set("Authorization", "Bearer mock-token")
      .send({ access: "reject" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: "ok",
        message: "You have updated the request",
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
