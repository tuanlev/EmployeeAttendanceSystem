import { successResponse,errorResponse } from "../utils/responeHandle";
import { validateEmail, validatePassword, validateUsername,validatePhoneNumber } from "../utils/validation";
import MD5 from 'crypto-js/md5'
import AccountModel from "../models/account.js";
import EmployeeModel from "../models/employee.js";
import jsonwebtoken, { JsonWebTokenError } from "jsonwebtoken";
export const register = async (req, res) => {
    try {
        let {username,  password, role, departmentAccess,employeeId} = req.body; 
            // ,phoneNumber, email
        
        // validateEmail(email);
        // valilatePhoneNumber(phoneNumber);
        validatePassword(password);
        validateUsername(username);
        const employee = await EmployeeModel.findOne({_id:employeeId})
        if (employee == null) throw new Error('Employee was not found')
        accountIntance = await AccountModel.create({
            username,
            password:MD5(password).toString(),
            role,
            departmentAccess,
            employeeId
        });
        successResponse({
            res,
            status:201,
            data:employee
        })

    } catch (error) {
        return errorResponse(res, 400, error.message);
    }
    
}
export const signin  = async (req, res) => {
    try {
        const {username, password} = req.body;
        validateUsername(username);
        validatePassword(password);
        const accountIntance = AccountModel.findOne({
            username,
            password:MD5(password).toString()
        })
        if (!!accountIntance) throw new Error('sai tai khoan hoac mk....');

        const employee = await EmployeeModel.findOne({_id:accountIntance.employeeId})

        if (!!employee) throw new Error('Employee was not found');

        res.set('authorization',jsonwebtoken.sign(employee,process.env.API_KEY,{
            expiredIn:'30m'
        }))
        successResponse({
            res,
            status:201,
            data:employee
        })
    }
    catch (e) {
        errorResponse(res,404,e.message)
    }
} 
