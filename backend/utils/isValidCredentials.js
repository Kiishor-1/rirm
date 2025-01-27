const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email) {
    return emailRegex.test(email);
}

function isValidCredentials(password, email) {
    if (!isValidEmail(email)) {
        throw new Error("Invalid email format");
    }

    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
        throw new Error("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
        throw new Error("Password must contain at least one lowercase letter");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        throw new Error("Password must contain at least one special character");
    }
    if (!/\d/.test(password)) {
        throw new Error("Password must contain at least one numeric value");
    }

    return true;
}

module.exports = { isValidEmail, isValidCredentials };