import * as mongoose from "mongoose";
import { Buyer } from "./models/Buyers";
import { Seller } from "./models/Sellers";
import express, { Express, Request, Response } from "express";

const app = express();

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://Admin:Welcome123@ecommercewebsite.ztbkqid.mongodb.net/MernDB"
    );
};

connectDB();

app.get("/", (req: Request, res: Response) => {
    res.send("EXPRESS IS RUNNING");
});

app.listen(8000, () => console.log("Example app listening on port 8000!"));
