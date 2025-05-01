export const createDepartment = async (req, res) => {  
    try {
        const { name, description } = req.body;
        const department = new Department({ name, description });
        await department.save();
        res.status(201).json({ message: "Department created successfully", department });
    } catch (error) {
        res.status(500).json({ message: "Error creating department", error });
    }
}
export const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching departments", error });
    }
}
export const getDepartmentById = async (req, res) => {
    try {
        const { departmentID } = req.params;
        const department = await Department.findById(departmentID);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ message: "Error fetching department", error });
    }
}
export const updateDepartment = async (req, res) => {
    try {
        const { departmentID } = req.params;
        const { name, description } = req.body;
        const departmentI = {};
        if (name !== undefined) {
            departmentI.name = name;
        }
        if (description !== undefined) {
            departmentI.description = description;
        }
        const department = await Department.findByIdAndUpdate(departmentID, { name, description }, { new: true });
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json({ message: "Department updated successfully", department });
    } catch (error) {
        res.status(500).json({ message: "Error updating department", error });
    }
}

