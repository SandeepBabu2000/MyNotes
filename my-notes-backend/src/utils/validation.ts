import { ValidationError } from "./errors";

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation regex (at least 8 chars, 1 uppercase, 1 lowercase, 1 number)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class Validator {
  static validateEmail(email: string): ValidationResult {
    const errors: string[] = [];

    if (!email) {
      errors.push("Email is required");
    } else if (typeof email !== "string") {
      errors.push("Email must be a string");
    } else if (email.trim().length === 0) {
      errors.push("Email cannot be empty");
    } else if (!EMAIL_REGEX.test(email)) {
      errors.push("Email format is invalid");
    } else if (email.length > 254) {
      errors.push("Email is too long (max 254 characters)");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validatePassword(password: string): ValidationResult {
    const errors: string[] = [];

    if (!password) {
      errors.push("Password is required");
    } else if (typeof password !== "string") {
      errors.push("Password must be a string");
    } else if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    } else if (password.length > 128) {
      errors.push("Password is too long (max 128 characters)");
    } else if (!PASSWORD_REGEX.test(password)) {
      errors.push(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validateNoteTitle(title: string): ValidationResult {
    const errors: string[] = [];

    if (!title) {
      errors.push("Title is required");
    } else if (typeof title !== "string") {
      errors.push("Title must be a string");
    } else if (title.trim().length === 0) {
      errors.push("Title cannot be empty");
    } else if (title.length > 255) {
      errors.push("Title is too long (max 255 characters)");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validateId(id: string): ValidationResult {
    const errors: string[] = [];

    if (!id) {
      errors.push("ID is required");
    } else if (typeof id !== "string") {
      errors.push("ID must be a string");
    } else {
      const numId = Number(id);
      if (isNaN(numId) || numId <= 0 || !Number.isInteger(numId)) {
        errors.push("ID must be a positive integer");
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validateRegistrationData(data: any): ValidationResult {
    const errors: string[] = [];

    if (!data || typeof data !== "object") {
      errors.push("Invalid request body");
      return { isValid: false, errors };
    }

    const { email, password } = data;

    const emailValidation = this.validateEmail(email);
    if (!emailValidation.isValid) {
      errors.push(...emailValidation.errors);
    }

    const passwordValidation = this.validatePassword(password);
    if (!passwordValidation.isValid) {
      errors.push(...passwordValidation.errors);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validateLoginData(data: any): ValidationResult {
    const errors: string[] = [];

    if (!data || typeof data !== "object") {
      errors.push("Invalid request body");
      return { isValid: false, errors };
    }

    const { email, password } = data;

    const emailValidation = this.validateEmail(email);
    if (!emailValidation.isValid) {
      errors.push(...emailValidation.errors);
    }

    if (!password) {
      errors.push("Password is required");
    } else if (typeof password !== "string") {
      errors.push("Password must be a string");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validateNoteCreationData(data: any): ValidationResult {
    const errors: string[] = [];

    if (!data || typeof data !== "object") {
      errors.push("Invalid request body");
      return { isValid: false, errors };
    }

    const { title, content } = data;

    const titleValidation = this.validateNoteTitle(title);
    if (!titleValidation.isValid) {
      errors.push(...titleValidation.errors);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validateNoteUpdateData(data: any): ValidationResult {
    const errors: string[] = [];

    if (!data || typeof data !== "object") {
      errors.push("Invalid request body");
      return { isValid: false, errors };
    }

    const { title, content } = data;

    if (!title && !content) {
      errors.push("At least one field (title or content) must be provided");
    }

    if (title !== undefined) {
      const titleValidation = this.validateNoteTitle(title);
      if (!titleValidation.isValid) {
        errors.push(...titleValidation.errors);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validateShareNoteData(data: any): ValidationResult {
    const errors: string[] = [];

    if (!data || typeof data !== "object") {
      errors.push("Invalid request body");
      return { isValid: false, errors };
    }

    const { email } = data;

    const emailValidation = this.validateEmail(email);
    if (!emailValidation.isValid) {
      errors.push(...emailValidation.errors);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
