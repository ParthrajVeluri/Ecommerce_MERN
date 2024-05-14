import * as mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    bankAccount: { type: Number, required: true },
});

export const Seller = mongoose.model('User', sellerSchema);

