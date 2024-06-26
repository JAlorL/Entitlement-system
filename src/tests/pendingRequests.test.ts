import request from "supertest";
import app, { server } from "../server";
import * as requestsAccessRepositories from "../repositories/requestsAccessRepositories";
import jwt from "jsonwebtoken";

jest.mock("../helpers/getEnvVar", () => ({
  getEnvVar: jest.fn(() => "mock-secret"),
}));

jest.mock("../repositories/requestsAccessRepositories", () => ({
  getPendingRequests: jest.fn(),
}));

describe("By calling endpoint: GET /requests/pending, an Ops user should view the requests", () => {
  beforeAll(() => {
    jest.spyOn(jwt, "verify").mockImplementation(() => ({
      id: "2",
      role: "ops",
    }));
    (
      requestsAccessRepositories.getPendingRequests as jest.Mock
    ).mockResolvedValue([
      {
        id: "1",
        user_id: "1",
        dataset_id: "1",
        frequency_id: "1",
        status: null,
      },
      {
        id: "2",
        user_id: "2",
        dataset_id: "2",
        frequency_id: "2",
        status: null,
      },
    ]);
  });

  it("should return all pending requests", async () => {
    const res = await request(app)
      .get("/requests/pending")
      .set("Authorization", "Bearer mock-token");

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: "ok",
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            user_id: expect.any(String),
            dataset_id: expect.any(String),
            frequency_id: expect.any(String),
            status: null,
          }),
        ]),
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
