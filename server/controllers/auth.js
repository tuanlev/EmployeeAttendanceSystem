import { successResponse,errorResponse } from "../utils/responeHandle";
import { validateEmail, validatePassword, validateUsername,validatePhoneNumber } from "../utils/validation";
import MD5 from 'crypto-js/md5'
import AccountModel from "../models/account.js";
import EmployeeModel from "../models/employee.js";
import jsonwebtoken, { JsonWebTokenError } from "jsonwebtoken";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';
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
        res.status(StatusCodes.CREATED).json({
            message: getReasonPhrase(StatusCodes.CREATED),
            data: accountIntance,
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: getReasonPhrase(StatusCodes.BAD_REQUEST),
            error: error.message,
        })
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

        res.set('authorization',jsonwebtoken.sign({
            id:accountIntance._id,
            role:accountIntance.role,
            departmentAccess:accountIntance.departmentAccess,
            employeeId:accountIntance.employeeId
        },process.env.API_KEY,{
            expiredIn:'3d'
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
