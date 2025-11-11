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
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const db_1 = require("../db");
const router = (0, express_1.Router)();
const signupSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    mail: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
const signinSchema = zod_1.z.object({
    mail: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
//@ts-ignore
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedData = signupSchema.parse(req.body);
        const { name, mail, password } = parsedData;
        const existingUser = yield db_1.User.findOne({ mail });
        if (existingUser) {
            return res.status(403).json({ message: "Email already exists!" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield db_1.User.create({
            name,
            mail,
            password: hashedPassword,
        });
        return res.status(200).json({ message: "User created successfully" });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error!" });
    }
}));
//@ts-ignore
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedData = signinSchema.parse(req.body);
        const { mail, password } = parsedData;
        const user = yield db_1.User.findOne({ mail });
        if (!user) {
            return res.status(403).json({ message: "Invalid email or password!" });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: "Invalid email or password!" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.JWT_PASSWORD, {
            expiresIn: "30d",
        });
        return res.json({
            token: token,
            user: user.name
        });
    }
    catch (e) {
        res.status(500).json({ message: "Server Error!" });
    }
}));
//@ts-ignore
router.post("/forgot-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mail } = req.body;
    try {
        const user = yield db_1.User.findOne({ mail });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        // Generate secure random token
        const resetToken = crypto_1.default.randomBytes(32).toString("hex");
        const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // valid for 15 min
        // Save token & expiry to user
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        yield user.save();
        // Create reset URL (frontend page)
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        // Setup email transporter
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail
                pass: process.env.EMAIL_PASS, // App password
            },
        });
        // Send email
        const mailOptions = {
            from: `"Second Brain" <${process.env.EMAIL_USER}>`,
            to: mail,
            subject: "Reset Your Password",
            html: `
        <div style="font-family: sans-serif; padding: 16px;">
          <h2>Reset your password</h2>
          <p>Click below to reset your password. This link expires in 15 minutes.</p>
          <a href="${resetUrl}" 
            style="display:inline-block;background:#4b6bfb;color:white;padding:10px 18px;
            border-radius:8px;text-decoration:none;font-weight:500;margin-top:10px;">
            Reset Password
          </a>
          <p style="margin-top:20px;">If you didn’t request this, just ignore this email.</p>
        </div>
      `,
        };
        yield transporter.sendMail(mailOptions);
        res.json({ message: "Password reset link sent to email." });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}));
//@ts-ignore
router.post("/reset-password/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = yield db_1.User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }, // ensure token not expired
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        // Hash new password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        yield user.save();
        res.json({ message: "Password reset successful. You can now log in." });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}));
// @ts-ignore
router.post("/signout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ message: "Signed out successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}));
exports.default = router;
