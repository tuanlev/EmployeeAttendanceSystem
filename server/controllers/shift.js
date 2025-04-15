import shiftModel from "../models/shift.js"; 

export const  addShift = async (req, res) => {
    try {
        const { name, startTime, endTime, gracePriod } = req.body;
        // Perform your logic here, e.g., save to database
        const shiftInstance= new shiftModel({
            name,
            startTime,
            endTime,
            gracePriod
        });
        await shiftInstance.save();
        res.status(200).json({ message: "shiftInstancecontroller executed successfully", data: shiftInstance});
    } catch (error) {
        res.status(500).json({ message: "Error in shiftInstancecontroller", error: error.message });
    }
}

export const getShifts = async (req, res) => {
    try {
        console.log("shiftInstancecontroller executed successfully")
        const shiftInstances = await shiftModel.find();
        res.status(200).json({ message: "shiftInstancecontroller executed successfully", data: shiftInstances});
    } catch (error) {
        res.status(500).json({ message: "Error in shiftInstancecontroller", error: error.message });
    }
}

export const getshiftById = async (req, res) => {
    try {
        const { id_shift } = req.params;
        const shiftInstance = await shiftModel.findById(id_shift);
        if (!shiftInstance) {
            return res.status(404).json({ message: "shiftInstancenot found" });
        }
        res.status(200).json({ message: "shiftInstancecontroller executed successfully", data: shiftInstance});
    }
    catch (error) {
        res.status(500).json({ message: "Error in shiftInstancecontroller", error: error.message });
    }
} 

export const updateShiftById = async (req, res) => {
    try {
        const { id_shift } = req.params;
        const { name, startTime, endTime, gracePriod } = req.body;
        const shiftInstance = await shiftModel.findByIdAndUpdate(id_shift, {
            name,
            startTime,
            endTime,
            gracePriod
        }, { new: true });
        if (!shiftInstance) {
            return res.status(404).json({ message: "shiftInstancenot found" });
        }
        res.status(200).json({ message: "shiftInstancecontroller executed successfully", data: shiftInstance});
    }
    catch (error) {
        res.status(500).json({ message: "Error in shiftInstancecontroller", error: error.message });
    }
}

export const deleteShiftById = async (req, res) => {
    try {
        const { id_shift } = req.params;
        const shiftInstance = await shiftModel.findByIdAndDelete(id_shift);
        if (!shiftInstance) {
            return res.status(404).json({ message: "shiftInstancenot found" });
        }
        res.status(200).json({ message: "shiftInstancecontroller executed successfully", data: shiftInstance});
    }
    catch (error) {
        res.status(500).json({ message: "Error in shiftInstancecontroller", error: error.message });
    }
}