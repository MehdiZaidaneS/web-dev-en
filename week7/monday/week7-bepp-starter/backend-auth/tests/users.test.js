const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // app.js already connects to DB
const api = supertest(app);
const User = require("../models/userModel");

// Clean the users collection before each test
beforeEach(async () => {
  await User.deleteMany({});
});

describe("User Routes", () => {
  describe("POST /api/users/signup", () => {
    it("✅ should signup a new user with valid credentials", async () => {
      const userData = {
        name: "John Doe",
        email: "valid@example.com",
        password: "R3g5T7#gh",
        phone_number: "09-123-47890",
        gender: "Male",
        date_of_birth: "1999-01-01",
        membership_status: "Active",
      };

      const result = await api.post("/api/users/signup").send(userData);

      expect(result.status).toBe(201);
      expect(result.body).toHaveProperty("token");
      expect(result.body.email).toBe(userData.email);

      // Extra check: user is actually saved in DB
      const savedUser = await User.findOne({ email: userData.email });
      expect(savedUser).not.toBeNull();
      expect(savedUser.name).toBe(userData.name);
    });

    it("❌ should return an error when missing required fields", async () => {
      const userData = {
        email: "invalid@example.com",
        password: "short", // invalid password length
      };

      const result = await api.post("/api/users/signup").send(userData);

      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });
  });

  describe("POST /api/users/login", () => {
    beforeEach(async () => {
      // Ensure a user exists before login tests
      await api.post("/api/users/signup").send({
        name: "Jane Doe",
        email: "login@example.com",
        password: "R3g5T7#gh",
        phone_number: "09-123-47890",
        gender: "Female",
        date_of_birth: "1995-05-05",
        membership_status: "Active",
      });
    });

    it("✅ should login a user with valid credentials", async () => {
      const result = await api.post("/api/users/login").send({
        email: "login@example.com",
        password: "R3g5T7#gh",
      });

      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("token");
      expect(result.body.email).toBe("login@example.com");
    });

    it("❌ should return an error with wrong password", async () => {
      const result = await api.post("/api/users/login").send({
        email: "login@example.com",
        password: "wrongpassword",
      });

      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });

    it("❌ should return an error if email does not exist", async () => {
      const result = await api.post("/api/users/login").send({
        email: "nonexistent@example.com",
        password: "R3g5T7#gh",
      });

      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });
  });
});

// Close DB connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
