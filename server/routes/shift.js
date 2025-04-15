import { Router } from "express";
import { addShift, getShifts,getshiftById,updateShiftById,deleteShiftById } from "../controllers/shift.js";
export const shiftRouter = Router();
shiftRouter
    .get("/shift",getShifts)
    .post("/shift",addShift)
    .get("/shift/:id_shift",getshiftById)
    .patch("/shift/:id_shift",updateShiftById)
    .delete("/shift/:id_shift",deleteShiftById)
export default shiftRouter;