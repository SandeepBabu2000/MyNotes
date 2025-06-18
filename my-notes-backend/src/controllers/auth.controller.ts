import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { AppError } from "../utils/errors";
import { Validator } from "../utils/validation";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = Validator.validateRegistrationData(req.body);
    if (!validation.isValid) {
      res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
      return;
    }

    const { email, password } = req.body;
    const user = await AuthService.register({ email, password });
    res.status(201).json({
      status: 201,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.json({ status: error.statusCode, message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = Validator.validateLoginData(req.body);
    if (!validation.isValid) {
      res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
      return;
    }

    const { email, password } = req.body;
    const result = await AuthService.login({ email, password });
    res.json({
      status: 200,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.json({ status: error.statusCode, message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
