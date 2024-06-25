import request from "supertest";
import app, { server } from "../server";
import * as datasetsRepositories from "../repositories/datasetsRepositories";

jest.mock("../repositories/datasetsRepositories", () => ({
  getDatasetsWithFrequencies: jest.fn(),
}));

describe("By calling endpoint: GET /metadata , any user can view the metadata and its frequencies", () => {
  beforeAll(() => {
    const mockData = [
      {
        id: "1",
        name: "Bitcoin",
        symbol: "BTC",
        frequencies_dataset: [
          { frequencyId: "1", frequency: "1 hour" },
          { frequencyId: "2", frequency: "1 day" },
          { frequencyId: "3", frequency: "1 month" },
        ],
      },
      {
        id: "2",
        name: "Ethereum",
        symbol: "ETH",
        frequencies_dataset: [{ frequencyId: "2", frequency: "1 day" }],
      },
    ];

    (
      datasetsRepositories.getDatasetsWithFrequencies as jest.Mock
    ).mockResolvedValue(mockData);
  });

  it("should return metadata for all datasets including its frequencies", async () => {
    const res = await request(app).get("/metadata");
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: "ok",
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            symbol: expect.any(String),
            frequencies_dataset: expect.arrayContaining([
              expect.objectContaining({
                frequencyId: expect.any(String),
                frequency: expect.any(String),
              }),
            ]),
          }),
        ]),
      })
    );
  });

  afterAll((done) => {
    server.close(done);
  });
});
