import { validateEmail, validatePassword, validateUsername,validatePhoneNumber } from "../utils/validation.js";
import MD5 from 'crypto-js/md5.js'
import AccountModel from "../models/account.js";
import EmployeeModel from "../models/employee.js";
import jsonwebtoken from "jsonwebtoken";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';
export const register = async (req, res) => {
    try {
        let {username,  password, role, departmentAccess,employeeID} = req.body; 
            // ,phoneNumber, email
        let accountI = {}
        if (username) accountI.username = username
        if (password) accountI.password = password
        console.log('accountI', role, departmentAccess, employeeID)
        accountI.role = role || 0;
        if (departmentAccess) accountI.departmentAccess = departmentAccess || [];
        if (employeeID) accountI.employeeID = employeeID;

        // if (email) email = email.trim().toLowerCase();
        // if (phoneNumber) phoneNumber = phoneNumber.trim().toLowerCase();
        // validateEmail(email);
        // valilatePhoneNumber(phoneNumber);
        validatePassword(accountI.password);
        validateUsername(accountI.username);
        accountI.password = MD5(accountI.password).toString()
        let accountIntance = await AccountModel.create(accountI);
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
        let {username, password} = req.body;
        validateUsername(username);
        validatePassword(password);
        password = MD5(password).toString()
        console.log(password)
        const accountIntance = AccountModel.findOne({
            username,
            password
        })
        if (!accountIntance) throw new Error('sai tai khoan hoac mk....');

        const employee = await EmployeeModel.findOne({_id:accountIntance.employeeId})

        res.set('authorization',jsonwebtoken.sign({
            id:accountIntance._id,
            role:accountIntance.role,
            departmentAccess:accountIntance.departmentAccess,
            employeeId:accountIntance.employeeId
        },process.env.JWT_SECRET,{ expiresIn: 60 * 60 }))
        res.status(StatusCodes.OK).json({
            message: getReasonPhrase(StatusCodes.OK),
            data: {
                employee,
            },
        })
        
    }
    catch (e) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: getReasonPhrase(StatusCodes.BAD_REQUEST),
            error: e.message,
        })}
} 
