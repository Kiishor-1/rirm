import toast from "react-hot-toast";

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidCredentials(password, email) {
  const errors = [];

  if (!isValidEmail(email)) errors.push("Invalid email format");

  if (password.length < 8) errors.push("Password must be at least 8 characters long");
  if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter");
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("Password must contain at least one special character");
  if (!/\d/.test(password)) errors.push("Password must contain at least one numeric value");

  if (errors.length > 0) {
    toast.error(errors[0]);
    return false;
  }

  return true;
}
