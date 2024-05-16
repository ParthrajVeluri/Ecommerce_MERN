import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { router as buyerRouter } from "./routes/buyers";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Admin:Welcome123@ecommercewebsite.ztbkqid.mongodb.net/MernDB"
    );
    console.log("MongoDB connected");
  } catch (e) {
    console.error("Failed to connect to MongoDB:", e);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", buyerRouter);
app.get("/", (req, res) => {
  res.status(200).send("hello!");
});

connectDB();

app.listen(3000, () => console.log("Example app listening on port 3000!"));
