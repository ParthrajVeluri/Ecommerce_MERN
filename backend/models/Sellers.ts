import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        sessionToken: { type: String, select: false },
    },
    address: { country: { type: String, required: true }, city: { type: String, required: true }, postal: { type: String, required: true }, suite: { type: String } },
    phone: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    stripeID: { type: String, required: true },
});

export const Seller = mongoose.model("Seller", sellerSchema);
