import Position from "../models/position.js";
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
export const createPosition = async (req, res) => {
    try {
        const { name, description } = req.body;
        const position = await Position.create({ name, description });
        res.status(StatusCodes.CREATED).json({
            message: getReasonPhrase(StatusCodes.CREATED),
            data: position,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            error: error.message,
        });
    }
}
export const getPositions = async (req, res) => {
    try {
        const positions = await Position.find();
        res.status(StatusCodes.OK).json({
            message: getReasonPhrase(StatusCodes.OK),
            data: positions,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            error: error.message,
        });
    }
}
export const getPositionById = async (req, res) => {
    try {
        const { positionID } = req.params;
        const position = await Position.findById(positionID);
        if (!position) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: getReasonPhrase(StatusCodes.NOT_FOUND),
                error: "Position not found",
            });
        }
        res.status(StatusCodes.OK).json({
            message: getReasonPhrase(StatusCodes.OK),
            data: position,
        });
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            error: error.message,
        });
    }
}
export const updatePosition = async (req, res) => {
    try {
        const { positionID } = req.params;
        const { name, description } = req.body;
        const position = await Position.findByIdAndUpdate(positionID, { name, description }, { new: true });
        if (!position) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: getReasonPhrase(StatusCodes.NOT_FOUND),
                error: "Position not found",
            });
        }
        res.status(StatusCodes.OK).json({
            message: getReasonPhrase(StatusCodes.OK),
            data: position,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            error: error.message,
        });
    }
}
export const deletePosition = async (req, res) => {
    try {
        const { positionID } = req.params;
        const position = await Position.findByIdAndDelete(positionID);
        if (!position) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: getReasonPhrase(StatusCodes.NOT_FOUND),
                error: "Position not found",
            });
        }
        res.status(StatusCodes.OK).json({
            message: getReasonPhrase(StatusCodes.OK),
            data: position,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
            error: error.message,
        });
    }
}
