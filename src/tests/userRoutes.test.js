const request = require("supertest");
const express = require("express");
const userRoutes = require("../../routes/userRoutes");

jest.mock("../../controllers/userController", () => ({
  getAllUsers: jest.fn((db, callback) =>
    callback(null, [{ id: 1, name: "John Doe" }])
  ),
  getUserById: jest.fn((db, id, callback) =>
    callback(null, { id: 1, name: "John Doe" })
  ),
  createUser: jest.fn((db, user, callback) => callback(null, { insertId: 1 })),
  updateUser: jest.fn((db, id, user, callback) =>
    callback(null, { affectedRows: 1 })
  ),
  deleteUser: jest.fn((db, id, callback) =>
    callback(null, { affectedRows: 1 })
  ),
}));

const app = express();
app.use(express.json());
app.use("/users", userRoutes({}));

let server;

beforeAll(() => {
  server = app.listen(3000);
});

afterAll(() => {
  server.close();
});

describe("User Routes", () => {
  test("GET /users should return a list of users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  }, 30000);

  test("GET /users/:id should return a user", async () => {
    const response = await request(app).get("/users/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
  });

  test("POST /users should create a user", async () => {
    const newUser = { name: "Jane Doe" };
    const response = await request(app).post("/users").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  test("PUT /users/:id should update a user", async () => {
    const updatedUser = { name: "Jane Smith" };
    const response = await request(app).put("/users/1").send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("affectedRows", 1);
  });

  test("DELETE /users/:id should delete a user", async () => {
    const response = await request(app).delete("/users/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("affectedRows", 1);
  });
});
