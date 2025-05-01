import mongoose, {Schema} from "mongoose";
const DepartmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
const Department = mongoose.model("department", DepartmentSchema);
export default Department;