import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credential: true
// }));

app.use(cors())
const allowedOrigins = ["http://localhost:5173"]
app.use(cors({
    origin: allowedOrigins
}))
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.route.js";
app.use("/api/v1/users", userRouter);

import slotRouter from "./routes/slot.route.js";
app.use("/api/v1/slots", slotRouter);

export default app;
