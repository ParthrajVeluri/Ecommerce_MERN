import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  product_description: { type: String, default: "" },
  product_image: { type: [String] }, // change to array
  product_unit_price: { type: Number, required: true },
  product_id: { type: String, required: true },
  price_id: { type: String, required: true },
  stripeID: { type: String, required: true },
});

export const Product = mongoose.model("Products", productSchema);
