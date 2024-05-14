const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
    name: { String, required: true },
    email: { String, required: true },
    password: { String, required: true },
    address: { String, required: true },
    phone: { String, required: true },
});

module.exports = mongoose.model("Buyer", buyerSchema);
