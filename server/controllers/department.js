import { getReasonPhrase, StatusCodes } from "http-status-codes";

export const createDepartment = async (req, res) => {  
    try {
        if (req.user.role !== 1) req.status(StatusCodes.UNAUTHORIZED).json({ message: "You are not authorized to create a department" });
        const { name, description } = req.body;
        const department = new Department({ name, description });
        await department.save();
        res.status(201).json({ message: "Department created successfully", department });
    } catch (error) {
        res.status(500).json({ message: "Error creating department", error });
    }
}

export const getDepartments = async (req, res) => {
    if (req.user.role === 1)
    try {
        const departments = await Department.find();
        res.status(StatusCodes.OK).json({message: getReasonPhrase(200), departments});
    } catch (error) {
        res.status(500).json({ message: "Error fetching departments", error });
    }
    if (req.user.role === 0) {
        try {
            const departments = await Department.find({ _id: { $in: req.user.departmentAccess } });
            res.status(200).json(departments);
        } catch (error) {
            res.status(500).json({ message: "Error fetching departments", error });
        }
    }
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "You are not authorized to view departments" });
}


export const getDepartmentById = async (req, res) => {
    if (req.user.role === 1) {
        try {
            const { departmentID } = req.params;
            const department = await Department.findById(departmentID);
            if (!department) {
                return res.status(404).json({ message: "Department not found" });
            }
            res.status(StatusCodes.OK).json({ message: "OK", department });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error fetching department", error });
        }
    }
    if (req.user.role === 0) {
        try {
            const { departmentID } = req.params;
            if (!req.user.departmentAccess.includes(departmentID)) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ message: "You are not authorized to view this department" });
            }
            const department = await Department.findById(departmentID);
            if (!department) {
                return res.status(404).json({ message: "Department not found" });
            }
            if (!req.user.departmentAccess.includes(departmentID)) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ message: "You are not authorized to view this department" });
            }
            res.status(StatusCodes.OK).json({ message: "OK", department });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error fetching department", error });
        }
    }
}
export const updateDepartment = async (req, res) => {
    if (req.user.role === 1) {
        try {
            const { departmentID } = req.params;
            const { name, description } = req.body;
            const departmentI  = {};
            if (name) departmentI.name = name;
            if (description) departmentI.description = description;
            const department = await Department.findByIdAndUpdate(departmentID, { name, description }, { new: true });
            if (!department) {
                return res.status(404).json({ message: "Department not found" });
            }
            res.status(StatusCodes.OK).json({ message: "Department updated successfully", department });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error updating department", error });
        }
    }
    if (req.user.role === 0) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "You are not authorized to update this department" });
    }
}
const deleteDepartment = async (req, res) => {
    if (req.user.role === 1) {
        try {
            const { departmentID } = req.params;
            const department = await Department.findByIdAndDelete(departmentID);
            if (!department) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "Department not found" });
            }
            res.status(StatusCodes.OK).json({ message: "Department deleted successfully" , department });
        }
        catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error deleting department", error });
        }
    }
    if (req.user.role === 0) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "You are not authorized to delete this department" });
    }
}

