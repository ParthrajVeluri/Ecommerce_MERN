import "dotenv/config";
import mongoose from "mongoose";
import { Buyer } from "./models/Buyers";
import { Seller } from "./models/Sellers";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import http from "http";
import { buyerRouter } from "./routes/buyers";

const app = express();
app.use(
    cors({
        credentials: true,
    })
);
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use("/api/v1", buyerRouter);
const server = http.createServer(app);

const MONGO_URL: string = process.env.MONGODB_URL as string;
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
    } catch (err) {
     console.log("Error connecting to database");
        console.log(err);
    }
};
connectDB();

console.log("Database state: " + mongoose.connection.readyState)
server.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});
