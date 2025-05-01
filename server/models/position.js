import mongoose,{Schema} from "mongoose";
const PositionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    departmentId: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
const Position = mongoose.model("position", PositionSchema);
export default Position;