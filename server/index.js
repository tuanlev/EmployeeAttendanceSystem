import express from "express";
import connectDB from "./utils/mongoDBConnection.js";
import  shiftRouter  from "./routes/shift.js";
import employeeRouter from "./routes/employee.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.get('/', (req, res) => {
    res.send("Welcome to Employee Attendance System");
});
app.use(employeeRouter);
app.use(shiftRouter);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});