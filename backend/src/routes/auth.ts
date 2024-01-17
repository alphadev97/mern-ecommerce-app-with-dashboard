import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  // /api/auth/login
  "/login",
  [
    check("email", "email is required").isEmail(),
    check("password", "password with 6 or more charaters is required").isLength(
      {
        min: 6,
      }
    ),
  ],
  async (req: Request, res: Response) => {
    const erros = validationResult(req);

    if (!erros.isEmpty) {
      return res.status(400).json({ message: erros.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch = bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }
);

export default router;