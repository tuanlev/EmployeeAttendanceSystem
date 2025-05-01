import { Schema } from "mongoose";
import { type } from "os";

const AttendanceSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    checkIn:{
        
        type: Date,
        default: null,
    },
    checkOut: {
        type: Date,
        default: null,
        description: "Overtime in minutes",
    },
    statusIn: {
        type: String,
        enum: [],
        default: "Present",
    },
    statusOut: {
        type: String,
        enum: ["Present", "Absent", "Late"],
        default: "Present",
    },
}, { timestamps: true });
