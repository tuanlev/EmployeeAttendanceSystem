import EmployeeModel from "../models/employee.js";
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
export const createEmployee = async (req, res) => {
    try {
        const { fullname,departmentID,positionID,shiftID } = req.body;
        const employeeI = {}
        if (fullname) employeeI.fullname = fullname;
        if (departmentID) employeeI.departmentID = departmentID;
        if (positionID) employeeI.positionID = positionID;
        if (shiftID) employeeI.shiftID = shiftID;
        
        const employee = await EmployeeModel.create(employeeI);
        res.status(StatusCodes.CREATED).json({
            message: getReasonPhrase(StatusCodes.CREATED),
            data: employee,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            error: error.message,
        });
    }
}
export const getEmployees = async (req, res) => {
    if (req.user.role === 1) {
        try {
            const employees = await EmployeeModel.find();
            res.status(StatusCodes.OK).json({
                message: getReasonPhrase(StatusCodes.OK),
                data: employees,
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                error: error.message,
            });
        }
    }
    if (req.user.role === 0) {
        try {
            const employees = await EmployeeModel.find({ departmentID: { $in: req.user.departmentAccess } });
            res.status(StatusCodes.OK).json({
                message: getReasonPhrase(StatusCodes.OK),
                data: employees,
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                error: error.message,
            });
        }
    }
}
export const getEmployeeById = async (req, res) => {
    if (req.user.role === 1) {
        try {
            const { employeeID } = req.params;
            const employee = await EmployeeModel.findById(employeeID);
            if (!employee) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                    error: "Employee not found",
                });
            }
            res.status(StatusCodes.OK).json({
                message: getReasonPhrase(StatusCodes.OK),
                data: employee,
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                error: error.message,
            });
        }
    }
    if (req.user.role === 0) {
        try {
            const { employeeID } = req.params;
            
            const employee = await EmployeeModel.findOne(employeeID,{ departmentID: { $in: req.user.departmentAccess } });
            if (!employee) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                    error: "Employee not found",
                });
            }
            res.status(StatusCodes.OK).json({
                message: getReasonPhrase(StatusCodes.OK),
                data: employee,
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                error: error.message,
            });
        }
    }
}
export const deleteEmployee = async (req, res) => {
    const { employeeID } = req.params;
    if (req.user.role === 1) {
        try {
           
            const employee = await EmployeeModel.findByIdAndDelete(employeeID);
            if (!employee) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                    error: "Employee not found",
                });
            }
            res.status(StatusCodes.OK).json({
                message: getReasonPhrase(StatusCodes.OK),
                data: employee,
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                error: error.message,
            });
        }
    }
    if (req.user.role === 0) {
        try {
           
            const employee = await EmployeeModel.findByIdAndDelete(employeeID,{ departmentID: { $in: req.user.departmentAccess } });
            if (!employee) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: getReasonPhrase(StatusCodes.NOT_FOUND),
                    error: "Employee not found",
                });
            }
            res.status(StatusCodes.OK).json({
                message: getReasonPhrase(StatusCodes.OK),
                data: employee,
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                error: error.message,
            });
        }
    } 
}