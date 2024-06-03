import { createSeller, deleteSeller } from "../controllers/SellerController";
import { createProduct } from "../controllers/ProductController";
import express from "express";
const router = express.Router();

router.post("/createSeller", async (req, res) => {
  try {
    await createSeller(req, res);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteSeller", async (req, res) => {
  try {
    await deleteSeller(req, res);
  } catch (error) {
    console.log(error);
  }
});

router.post("/createProduct", async (req, res) => {
  try {
    await createProduct(req, res);
  } catch (error) {
    console.log(error);
  }
});

export { router as sellerRouter };
