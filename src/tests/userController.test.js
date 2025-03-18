const userController = require("../../controllers/userController");

describe("User Controller", () => {
  let mockModel, mockDb, mockReq, mockRes;

  beforeEach(() => {
    mockModel = {
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };

    mockDb = {}; // Simulating a database connection object

    mockReq = { params: {}, body: {} }; // Simulating request object
    mockRes = {
      json: jest.fn(),
      status: jest.fn(() => mockRes), // Allows method chaining
    };
  });

  test("should return all users", () => {
    const users = [{ id: 1, name: "John Doe", email: "john@example.com" }];

    // Mock the model function to return users
    mockModel.getAllUsers.mockImplementation((db, callback) => {
      callback(null, users);
    });

    const getAllUsersHandler = userController.getAllUsers(mockModel, mockDb);
    getAllUsersHandler(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(users);
  });

  test("should return user by ID", () => {
    const user = { id: 1, name: "John Doe", email: "john@example.com" };

    mockReq.params.id = 1;

    mockModel.getUserById.mockImplementation((db, id, callback) => {
      callback(null, user);
    });

    const getUserByIdHandler = userController.getUserById(mockModel, mockDb);
    getUserByIdHandler(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(user);
  });

});
