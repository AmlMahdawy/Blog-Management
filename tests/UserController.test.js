const userModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mockRequest, mockResponse } = require("./testUtils");
const userController = require("../Controllers/UserController");

jest.mock("../Models/UserModel");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");


describe("login", () => {
    it("should return 401 for invalid email", async () => {
        const req = mockRequest({
            body: { mail: "invalid@example.com", password: "password" },
        });
        const res = mockResponse();
        const validateLoginData = jest.spyOn(userController, "validateLoginData");
        validateLoginData.mockReturnValue({ error: "x" });
        userModel.userModel.findOne.mockResolvedValue(null);

        await userController.login(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith("Invalid email or password.");
    });

    it("should return 401 for invalid password", async () => {
        const req = mockRequest({
            body: { mail: "test@example.com", password: "wrong-password" },
        });
        const res = mockResponse();
        const mockUser = {
            mail: "test@example.com",
            password: "hashed-password",
            _id: "mockId",
        };
        userModel.userModel.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(false); // Password does not match

        await userController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith("Invalid email or password.");
    });

    it("should return 200 with token for valid credentials", async () => {
        const req = mockRequest({
            body: { mail: "test@example.com", password: "correct-password" },
        });
        const res = mockResponse();
        const mockUser = {
            mail: "test@example.com",
            password: "hashed-password",
            _id: "mockId",
        };
        const mockToken = "mock-token";
        userModel.userModel.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true); // Password matches
        jwt.sign.mockResolvedValue(mockToken);

        await userController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.header).toHaveBeenCalledWith({ "x-auth-token": mockToken });
        expect(res.send).toHaveBeenCalledWith({ loggedIn: true });
    });
});

describe("signUp", () => {
    it("should return 400 for validation errors", async () => {
        const req = mockRequest({ body: { name: "", mail: "", password: "" } });
        const res = mockResponse();
        const validateUser = jest
            .spyOn(userModel, "validateUser")
            .mockReturnValue({ error: "true" });

        await userController.signUp(req, res);
        expect(validateUser).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should return 400 for duplicate email", async () => {
        const req = mockRequest({
            body: { name: "Test", mail: "test@example.com", password: "password" },
        });
        const res = mockResponse();
        const validateUser = jest
            .spyOn(userModel, "validateUser")
            .mockReturnValue({ error: undefined });

        userModel.userModel.findOne.mockResolvedValue({ mail: "test@example.com" });

        await userController.signUp(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith("Email already registered.");
    });
    // fit("should return 200 for success signup", async () => {
    //     const req = mockRequest({
    //         body: { name: "Test", mail: "test@example.com", password: "password" },
    //     });
    //     const res = mockResponse();
    //     const mockToken = "mock-token";

    //     const validateUser = jest
    //         .spyOn(userModel, "validateUser")
    //         .mockReturnValue({ error: undefined });
    //     const genSalt = jest.spyOn(bcrypt, 'genSalt').mockReturnValue('salt')
    //     const hash = jest.spyOn(bcrypt, 'hash').mockReturnValue('hashed-password')
    //     const sign = jest.fn(async () => mockToken);
    //     // sign.mockResolvedValue(mockToken)
    //     await userController.signUp(req, res);

    //     expect(res.status).toHaveBeenCalledWith(200);
    //     // expect(res.send).toHaveBeenCalledWith("Email already registered.");
    // });


});

module.exports = { mockRequest, mockResponse };


