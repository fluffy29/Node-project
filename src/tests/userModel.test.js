const mysql = require("mysql2/promise");
const config = require("../../config/test-config");

describe("User Model", () => {
  let db;

  beforeAll(async () => {
    db = await mysql.createConnection(config.mysql);
  });

  afterAll(async () => {
    await db.end();
  });

  test("should create a new user", async () => {
    const [result] = await db.execute(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      ["Test User", "test@example.com"]
    );
    expect(result.affectedRows).toBe(1);
  });
});
