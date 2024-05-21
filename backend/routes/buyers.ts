import { createBuyer, deleteBuyer, updateBuyer } from "../controllers/Buyers";
import express from "express";
const router = express.Router();

//create a new Buyer
router.post("/createBuyer", async (req, res) => {
  try {
    await createBuyer(req, res);
  } catch (err) {
    console.log(err);
  }
});

//Delete a Buyer
router.delete("/deleteBuyer", async (req, res) => {
  try {
    await deleteBuyer(req, res);
  } catch (err) {
    console.log(err);
  }
});

//Update buyer
router.put("/updateBuyer", async (req, res) => {
  try {
    await updateBuyer(req, res);
  } catch (err) {
    console.log(err);
  }
});

export { router as buyerRouter} ;
