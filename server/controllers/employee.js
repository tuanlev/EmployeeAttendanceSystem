import employeeModel from "../models/employee.js";
import CryptoJS from "crypto-js";
import Jwwt from "jsonwebtoken";
export const getEmployeeById = async (req, res) => {
    try {
        const { id_employee } = req.params;
        const employeeInstance = await employeeModel.findById(id_employee);
        if (!employeeInstance) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "getEmployeeById executed successfully", data: employeeInstance });
    }
    catch (error) {
        res.status(500).json({ message: "Error in getEmployeeById", error: error.message });
    }
}
export const getEmployees = async (req, res) => {
    try {
        console.log("getEmployees executed successfully")
        const employeeInstances = await employeeModel.find();
        res.status(200).json({ message: "getEmployees executed successfully", data: employeeInstances });
    } catch (error) {
        res.status(500).json({ message: "Error in getEmployees", error: error.message });
    }
}

export const addEmployee = async (req, res) => {
    try {
        console.log(req.body)
        const { fullname, email, phoneNumber, address, shiftId,account } = req.body;
        // Perform your logic here, e.g., save to database
        const employeeInstance = new employeeModel({
            fullname,
            email,
            phoneNumber,
            address,
            shiftId,
            account: {
                userName: account.userName,
                password: CryptoJS.MD5(account.password).toString(CryptoJS.enc.Base64),
                role: req.body.role || 1 // Default to employee role if not provided
            }
        });
        await employeeInstance.save();
        res.status(200).json({ message: "addEmployee executed successfully", data: employeeInstance });
    } catch (error) {
        res.status(500).json({ message: "Error in addEmployee", error: error.message });
    }
}

export const updateEmployee = async (req, res) => {
    try {
        const { id_employee } = req.params;
        const { name, email, phoneNumber, address, shiftId } = req.body;
        const employeeInstance = await employeeModel.findByIdAndUpdate(id_employee, {
            name,
            email,
            phoneNumber,
            address,
            shiftId
        }, { new: true });
        if (!employeeInstance) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "updateEmployee executed successfully", data: employeeInstance });
    }
    catch (error) {
        res.status(500).json({ message: "Error in updateEmployee", error: error.message });
    }
}

export const loginEmployee = async (req, res) => { 
    try {
        const { userName, password } = req.body;
        // Perform your logic here, e.g., save to database
    
        const employeeInstance = await employeeModel.findOne({ "account.userName": userName, "account.password": CryptoJS.MD5(password).toString(CryptoJS.enc.Base64)});
        if (!employeeInstance) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.set("Authorization",'Bearer ' + Jwwt.sign({ id: employeeInstance._id }, process.env.JWT_SECRET, { expiresIn: '1h' }));
        res.status(200).json({ message: "loginEmployee executed successfully", data: employeeInstance });
    } catch (error) {
        res.status(500).json({ message: "Error in loginEmployee", error: error.message });
    }
}
