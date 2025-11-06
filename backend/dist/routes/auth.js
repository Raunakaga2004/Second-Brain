"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = require("../config");
const db_1 = require(".././db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
//@ts-ignore
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield db_1.User.findOne({ username: username });
        if (user) {
            return res.status(403).json({
                message: "Username already exists"
            });
        }
        yield db_1.User.create({
            username: username,
            password: password
        });
        res.status(200).json({
            message: "User created successfully"
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Server Error!"
        });
    }
}));
//@ts-ignore
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield db_1.User.findOne({
            username: username,
            password: password
        });
        if (!user) {
            return res.status(403).json({
                message: "Wrong email/password!"
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, config_1.JWT_PASSWORD);
        res.json({ token });
    }
    catch (e) {
        res.status(500).json({
            message: "Server Error!"
        });
    }
}));
exports.default = router;
