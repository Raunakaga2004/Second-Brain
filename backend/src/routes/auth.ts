import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { JWT_PASSWORD } from "../config";
import { User } from "../db";

const router = Router();

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mail: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signinSchema = z.object({
  mail: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

//@ts-ignore
router.post("/signup", async (req, res) => {
  try {
    const parsedData = signupSchema.parse(req.body);
    const { name, mail, password } = parsedData;

    const existingUser = await User.findOne({ mail });
    if (existingUser) {
      return res.status(403).json({ message: "Email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      mail,
      password: hashedPassword,
    });

    return res.status(200).json({ message: "User created successfully" });
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ message: e.errors[0].message });
    }
    console.error(e);
    res.status(500).json({ message: "Server Error!" });
  }
});

//@ts-ignore
router.post("/signin", async (req, res) => {
  try {
    const parsedData = signinSchema.parse(req.body);
    const { mail, password } = parsedData;

    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(403).json({ message: "Invalid email or password!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid email or password!" });
    }

    const token = jwt.sign({ id: user._id }, JWT_PASSWORD, {
      expiresIn: "7d",
    });

    return res.json({
      token : token,
      user : user.name
     });
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ message: e.errors[0].message });
    }
    console.error(e);
    res.status(500).json({ message: "Server Error!" });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { mail } = req.body;

  try {
    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Generate secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // valid for 15 min

    // Save token & expiry to user
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Create reset URL (frontend page)
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    // Setup email transporter
    const transporter = nodemailer.createTransport({
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

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset link sent to email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // ensure token not expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful. You can now log in." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// @ts-ignore
router.post("/signout", async (req, res) => {
  try {
    res.json({ message: "Signed out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


export default router;
