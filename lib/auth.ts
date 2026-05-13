/**
 * Authentication validation and utility functions
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * Requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 */
export const validatePassword = (password: string): boolean => {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;
  return true;
};

/**
 * Get password strength feedback
 */
export const getPasswordStrengthFeedback = (password: string): string => {
  if (password.length === 0) return "";
  if (password.length < 8) return "At least 8 characters required";
  if (!/[A-Z]/.test(password)) return "Add an uppercase letter";
  if (!/[a-z]/.test(password)) return "Add a lowercase letter";
  if (!/\d/.test(password)) return "Add a number";
  return "Password is strong";
};

/**
 * Validate sign-in form
 */
export const validateSignIn = (
  email: string,
  password: string
): ValidationResult => {
  const errors: ValidationError[] = [];

  const emailTrimmed = email.trim();
  const passwordTrimmed = password.trim();

  if (!emailTrimmed) {
    errors.push({
      field: "email",
      message: "Email is required",
    });
  } else if (!validateEmail(emailTrimmed)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email",
    });
  }

  if (!passwordTrimmed) {
    errors.push({
      field: "password",
      message: "Password is required",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate sign-up form
 */
export const validateSignUp = (
  email: string,
  password: string,
  confirmPassword: string
): ValidationResult => {
  const errors: ValidationError[] = [];

  const emailTrimmed = email.trim();
  const passwordTrimmed = password.trim();
  const confirmPasswordTrimmed = confirmPassword.trim();

  if (!emailTrimmed) {
    errors.push({
      field: "email",
      message: "Email is required",
    });
  } else if (!validateEmail(emailTrimmed)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email",
    });
  }

  if (!passwordTrimmed) {
    errors.push({
      field: "password",
      message: "Password is required",
    });
  } else if (!validatePassword(passwordTrimmed)) {
    errors.push({
      field: "password",
      message: getPasswordStrengthFeedback(passwordTrimmed),
    });
  }

  if (!confirmPasswordTrimmed) {
    errors.push({
      field: "confirmPassword",
      message: "Please confirm your password",
    });
  } else if (passwordTrimmed !== confirmPasswordTrimmed) {
    errors.push({
      field: "confirmPassword",
      message: "Passwords do not match",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Extract error message by field
 */
export const getErrorByField = (
  errors: ValidationError[],
  field: string
): string | undefined => {
  return errors.find((error) => error.field === field)?.message;
};

/**
 * Format Clerk API errors
 */
export const formatClerkError = (error: any): string => {
  if (typeof error === "string") {
    return error;
  }

  if (error?.errors && Array.isArray(error.errors)) {
    const firstError = error.errors[0];
    if (firstError?.message) {
      return firstError.message;
    }
  }

  if (error?.message) {
    return error.message;
  }

  return "An error occurred. Please try again.";
};

/**
 * Extract form field errors from Clerk API response
 */
export const extractClerkFieldErrors = (error: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (error?.errors && Array.isArray(error.errors)) {
    error.errors.forEach((err: any) => {
      if (err?.metadata?.paramName) {
        errors.push({
          field: err.metadata.paramName,
          message: err.message || "Invalid input",
        });
      }
    });
  }

  return errors;
};
