import { createBuyer, delBuyer, updateBuyer } from "../controllers/Buyers";
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
router.delete("/delBuyer", async (req, res) => {
  try {
    await delBuyer(req, res);
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

export { router };
