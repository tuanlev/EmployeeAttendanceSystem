import mongoose, { Schema } from "mongoose";
const ShiftsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    startTime: {
        _id: false,
        minutes: {
            type: Number,
            validate: {
                validator: (minutes) => minutes >= 0 && minutes < 60,
                message: "Minutes must be between 0 and 59"
            },
            required: true
        },
        hours: {
            type: Number,
            validate: {
                validator: (hours) => hours >= 0 && hours <= 24,
                message: "hours must be between 0 and 24"
            },
            required: true
        },

    }
    ,
    endTime: {
        _id: false,
        minutes: {
            type: Number,
            validate: {
                validator: (minutes) => minutes >= 0 && minutes < 60,
                message: "Minutes must be between 0 and 59"
            },
            required: true
        },
        hours: {
            type: Number,
            validate: {
                validator: (hours) => hours >= 0 && hours <= 24,
                message: "hours must be between 0 and 24"
            },
            required: true
        },

    },
    gracePeriod: {
        type: Number,
        default: 0,
        description: "Maximum number of minutes an employee is allowed to be late without being marked late or penalized."
    }
});
const Shifts = mongoose.model("shift", ShiftsSchema);
export default Shifts;