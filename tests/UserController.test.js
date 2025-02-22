const userModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const request = require('supertest');
const userController = require("../Controllers/UserController");
const inputValidator = require('../Validators/inputValidators')
const modelValidator = require('../Validators/modelsValidators')


let server;
jest.mock("../Models/UserModel");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../Validators/inputValidators");
jest.mock("../Validators/modelsValidators");





describe("login", () => {
    beforeEach(() => {
        server = require('../index')
        jest.clearAllMocks();
    });
    afterEach(async () => {
        server.close();

    });
    it("should return 401 for invalid email", async () => {
        const reqMockData = { mail: "invalid@example.com", password: "password" }
        jest.spyOn(inputValidator, "validateLoginData").mockReturnValue({ error: { message: 'error happened' } });
        const res = await request(server).post('/login').send(reqMockData)
        expect(res.status).toBe(401);
        expect(res.body).toStrictEqual({ message: "error happened" })

    });

    it("should return 401 for invalid password", async () => {
        const reqMockData = { mail: "invalid@example.com", password: "password" }
        const mockUser = { mail: "invalid@example.com", password: "hashed-password", _id: "mockId", };
        const mockToken = "mock-token";

        jest.spyOn(userModel.userModel, "findOne").mockImplementation(() => Promise.resolve(mockUser));
        jest.spyOn(jwt, 'sign').mockResolvedValue(mockToken)
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(false)
        jest.spyOn(inputValidator, "validateLoginData").mockReturnValue({ error: undefined });
        const res = await request(server).post('/login').send(reqMockData)
        expect(res.status).toBe(401);
        expect(res.body).toStrictEqual({ message: "Invalid email or password." });
    });

    it("should return 200 with token for valid credentials", async () => {
        const reqMockData = { mail: "invalid@example.com", password: "password" }
        const mockUser = {
            mail: "invalid@example.com",
            password: "hashed-password",
            _id: "mockId",
        };
        const mockToken = "mock-token";
        jest.spyOn(userModel.userModel, "findOne").mockImplementation(() => Promise.resolve(mockUser));
        jest.spyOn(inputValidator, "validateLoginData").mockReturnValue({ error: undefined });
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true)
        jest.spyOn(jwt, 'sign').mockResolvedValue(mockToken)

        const res = await request(server).post('/login').send(reqMockData)
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual({ loggedIn: true, Bearer: mockToken })
    });
});


describe("signUp", () => {
    const testUser = {
        name: 'name',
        mail: 'mail1@gmail.com',
        password: "password"
    };
    beforeEach(() => {
        server = require('../index')
        jest.clearAllMocks();
    });
    afterEach(async () => {
        server.close();

    });
    it("should return 400 for validation errors", async () => {
        jest.spyOn(modelValidator, "validateUser").mockReturnValue({ error: { message: "error happened" } });
        const res = await request(server).post('/signup').send(testUser)
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual({ message: "error happened" })
    });

    it("should return 400 for duplicate email", async () => {
        jest.spyOn(modelValidator, "validateUser").mockReturnValue({ error: undefined });
        jest.spyOn(userModel.userModel, "findOne").mockImplementation(() => Promise.resolve(testUser.mail));
        const res = await request(server).post('/signup').send(testUser)
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual({ message: "Email already registered." });
    });
    it("should return 200 for success signup", async () => {
        const mockToken = "mock-token";

        const mockCreatedUser = {
            _id: 'mock-id',
            name: testUser.name,
            mail: testUser.mail,
            password: 'hashed-password'
        };

        jest.spyOn(modelValidator, "validateUser").mockReturnValue({ error: undefined });
        jest.spyOn(bcrypt, 'genSalt').mockReturnValue('salt');
        jest.spyOn(bcrypt, 'hash').mockReturnValue('hashed-password');
        jest.spyOn(jwt, 'sign').mockReturnValue(mockToken);
        jest.spyOn(userModel.userModel, 'create').mockReturnValue(mockCreatedUser)
        jest.spyOn(userModel.userModel, "findOne").mockImplementation(() => Promise.resolve(null));
        const res = await request(server).post('/signup').send(testUser)
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual({ name: 'name', mail: 'mail1@gmail.com', Bearer: mockToken })
    });


});


