import { Response } from "express";


export const STATUS_MESSAGES = {
    200: 'OK - The request has succeeded.',
    201: 'Created - The request has been fulfilled and a new resource has been created.',
    400: 'Bad Request - The request could not be understood due to malformed syntax.',
    401: 'Unauthorized - Access is denied due to invalid credentials.',
    403: 'Forbidden - You don’t have permission to access this resource.',
    404: 'Not Found - The requested resource could not be found on this server.',
    405: 'Method Not Allowed - The HTTP method is not allowed for this resource.',
    409: 'Conflict - There is a conflict with the current state of the resource.',
    422: 'Unprocessable Entity - The data provided is invalid or incomplete and cannot be processed.',
    500: 'Internal Server Error - The server encountered an unexpected condition that prevented it from fulfilling the request.',
    502: 'Bad Gateway - The server received an invalid response from the upstream server.',
    503: 'Service Unavailable - The server is currently unable to handle the request due to temporary overloading or maintenance.',
    504: 'Gateway Timeout - The server did not receive a timely response from the upstream server.'
};
export const successResponse = ({
    res,
    status = 200,
    message = STATUS_MESSAGES[status] || "Success",
    data = undefined
}
) => {
    res.set("Authorization", 'Bearer ' + Jwwt.sign({ id: employeeInstance._id }, process.env.JWT_SECRET, { expiresIn: '1h' }));
    res.status(status).json({
        status: "success",
        message,
        data
    });
}
export const errorResponse = (
    res,
    status = 500,
    message = STATUS_MESSAGES[status] || "Internal Server Error",
) => {
    return res.status(status).json({
        success: false,
        message,

    });
};
