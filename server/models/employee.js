import mongoose, { Schema } from "mongoose";

const EmployeeSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     validate: {
    //         validator: (email) => {
    //             const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //             return emailRegex.test(email);

    //         }
    //         , message: "Invalid email format"
    //     }
    // },
    // phoneNumber: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     validate: {
    //         validator: (phoneNumber) => {
    //             const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
    //             return phoneRegex.test(phoneNumber);
    //         }
    //         , message: "Invalid phone number format"
    //     }
        
    // },
    // shiftId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Shifts",
    //     required: true
    // },
    account: {
        userName: {
            type: String,
            sparse: true,
            trim: true,
            required: true,
            unique: true,
            // validate: {
            //     validator: (username) => /^[a-zA-Z0-9]+$/.test(username),
            //     message: "Username can only contain letters and numbers"
            // }
        },
        password: {
            type: String,
            required: true,
            // validate: {
            //     validator: (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password),
            //     message: "Password must be at least 8 characters long and contain at least one letter and one number"
            // }
        },
        role: {
            type: Number,
            default: 1, // Default role is 1 (employee)
            enum: [0, 1] // 0 for admin, 1 for employee
        },
        
    },

});
const Employee = mongoose.model("employee", EmployeeSchema);
export default Employee;