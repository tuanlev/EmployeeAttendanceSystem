export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }
}   
export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
    if (!phoneRegex.test(phoneNumber)) {
        throw new Error("Invalid phone number format");
    }
}
export const validateUsername = (username) => {
    const usernameRegex = /^[a-z0-9]+$/;
    if (!usernameRegex.test(username)) {
        throw new Error("Username can only contain letters and numbers");
    }
}
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        throw new Error("Password must be at least 8 characters long and contain at least one letter and one number");
    }
}
