const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");
const jwtDecode = require("jwt-decode");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

test("sanity", () => {
  expect(true).toBe(true);
});

describe("server.js", () => {
  describe("[GET] /api/jokes", () => {
    it("[1] requests without a token are rejected with right status and message", async () => {
      const res = await request(server).get("/api/jokes");
      expect(res.body.message).toMatch(/token required/i);
    });
    it("[2] requests with invalid token are rejected with right status and message", async () => {
      const res = await request(server)
        .get("/api/jokes")
        .set("Authorization", "qwerty");
      expect(res.body.message).toMatch(/token invalid/i);
    });
    // it("[3] requests with valid token return a list of jokes", () => {});
  });
});
