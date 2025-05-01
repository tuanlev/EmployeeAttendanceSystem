import { getReasonPhrase, StatusCodes } from "http-status-codes";

export const auth = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
    }
    // Verify the token and extract user information
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: getReasonPhrase(StatusCodes.FORBIDDEN) });
        }
        const { id, role, departmentAccess, employeeId } = decoded;
        req.user = { id, role, departmentAccess, employeeId };
        next();
    });
};