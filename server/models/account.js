import { Schema } from "mongoose";
import { type } from "os";

const AccountSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
        unique: true,
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: {
            validator: (username) => /^[a-z0-9]+$/.test(username),
            message: "Username can only contain letters and numbers"
        }
    },
    password: {
        type: String,
        required: true,
        // validate: {
        //     validator: (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password),
        //     message: "Password must be at least 8 characters long and contain at least one letter and one number"
        // }
    },
    employeeId:{
        type: Schema.Types.ObjectId,
        unique: true,
        require:true
    },
    role: {
        type: Number,
        default: 0, // Default role is 0 (admin)
        enum: [0, 1] // 0 for admin, 1 for superadmin
    },
    departmentAccess: {
        type: [Schema.Types.ObjectId],
        ref: "Department",
        default: [],
    },
    
});
const Account = mongoose.model("Account", AccountSchema);
export default Account;