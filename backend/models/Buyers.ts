import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  address: { type: String, required: true },
  phone: { type: String, required: true },
});

export const Buyer = mongoose.model("Buyer", buyerSchema);
