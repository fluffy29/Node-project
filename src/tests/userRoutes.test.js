const request = require("supertest");
const { app, server, db } = require("../../index");
const mysql = require("mysql2/promise");
const config = require("../../config/test");

describe("User Routes", () => {
  beforeAll(async () => {
    // Initialize database connection if needed
  });

  afterAll(async () => {
    await db.end(); // Close the database connection
    if (server) {
      server.close(); // Close the Express server
    }
  });

  test("GET /users should return a list of users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  }, 20000); // Increase timeout to 20 seconds
});
