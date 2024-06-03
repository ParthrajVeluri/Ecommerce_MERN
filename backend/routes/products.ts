import {
  updatePrice,
  createProduct,
  retrieveProductsFromSeller,
  updateProduct,
  createSession,
} from "../controllers/ProductController";
import express from "express";

const router = express.Router();

router.post("/createProduct", async (req, res) => {
  try {
    await createProduct(req, res);
  } catch (error) {
    console.log(error);
  }
});
router.post("/updateProduct", async (req, res) => {
  try {
    await updateProduct(req, res);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getProductList", async (req, res) => {
  try {
    await retrieveProductsFromSeller(req, res);
  } catch (error) {
    console.log(error);
  }
});

router.post("/updatePrice", async (req, res) => {
  try {
    await updatePrice(req, res);
  } catch (error) {
    console.log(error);
  }
});

router.post("/createSession", async (req, res) => {
  try {
    await createSession(req, res);
  } catch (error) {
    console.log(error);
  }
});

export { router as productRouter };
