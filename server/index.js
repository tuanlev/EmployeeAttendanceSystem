import express from "express";
import connectDB from "./utils/mongoDBConnection.js";
import { auth } from "./middlewares/auth.js";
import authRouter from "./routes/auth.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.get('/', (req, res) => {
    res.send("Welcome to Employee Attendance System");
});
app.use(authRouter);

// app.use(shiftRouter);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});