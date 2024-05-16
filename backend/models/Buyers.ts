import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
});

const Buyers = mongoose.model("Buyers", buyerSchema);

export { Buyers };
=======
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
>>>>>>> 298ad317c83dcb58a1cc96881be8fc645ff675db
