import { access } from "fs";
import mongoose, { Schema } from "mongoose";
import { type } from "os";

const EmployeeSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(email);

            }
            , message: "Invalid email format"
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (phoneNumber) => {
                const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
                return phoneRegex.test(phoneNumber);
            }
            , message: "Invalid phone number format"
        }
        
    },
    shiftId: {
        type: Schema.Types.ObjectId,
        ref: "Shift",
        required: true
    },
    positionId: {
        type: Schema.Types.ObjectId,
        ref: "Position",
        required: true
    },
    

});
const Employee = mongoose.model("employee", EmployeeSchema);
export default Employee;