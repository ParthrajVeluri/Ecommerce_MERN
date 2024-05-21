import { Request, Response } from "express";
import { Buyer } from "../models/Buyers";
import { random, authentication } from "../utils/auth";

async function createBuyer(req: Request, res: Response) {
    try {
        const { name, email, password, address, phone } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name required" });
        }

        if (!email) {
            return res.status(400).json({ message: "Email required" });
        }

        if (!password) {
            return res.status(400).json({ message: "Password required" });
        }

        if (phone && phone.length > 10) {
            return res.status(400).json({
                message: "Phone number must be less than 10 characters",
            });
        }

        if (!address) {
            return res.status(400).json({ message: "Address required" });
        }

        //check for existing user
        const existingBuyer = await Buyer.findOne({ email: email });

        if (existingBuyer) {
            return res.status(400).json({ message: "Existing account." });
        }

        const salt = random();
        const user = await Buyer.create({
            name,
            email,
            authentication: {
                password: authentication(salt, password),
                salt
            },
            phone,
            address
        }
        );

        res.status(200).json({ user }).end();
    } catch (e) {
        return res.status(500).json({ error: (e as Error).toString() });
    }
}

async function deleteBuyer(req: Request, res: Response) {
    try {
        const { email } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        // Log the incoming email
        console.log(`Attempting to delete account with email: ${email}`);

        const buyer_to_del = await Buyer.findOne({ email: email });

        // Check if the account exists
        if (!buyer_to_del) {
            console.log(`Account with email ${email} not found.`);
            return res.status(400).json({ message: "Account not found." });
        } else {
            await Buyer.deleteOne({ email: email });
            console.log(`Account with email ${email} successfully deleted.`);
            return res
                .status(200)
                .json({ message: "Account successfully deleted." });
        }
    } catch (e) {
        return res.status(500).json({ error: (e as Error).toString() });
    }
}

async function updateBuyer(req: Request, res: Response) {
    try {
        const { email, name, password, phone, address } = req.body;
        //Check if user exists

        const buyer_info = await Buyer.findOne({ email: email });

        if (buyer_info == null) {
            return res.status(400).json({ message: "Account not found." });
        } else {
            const update: { [key: string]: any } = {};
            if (name !== undefined) {
                update.name = name;
            }

            if (password !== undefined) {
                update.password = password;
            }

            if (phone !== undefined) {
                update.phone = phone;
            }

            if (address !== undefined) {
                update.address = address;
            }

            const updated_buyer = await Buyer.updateOne(
                { email: email },
                { $set: update }
            );
            console.log(updated_buyer);
            res.status(200).json({ message: "Account successfully updated." });
        }
    } catch (e) {
        return res.status(500).json({ error: (e as Error).toString() });
    }
}

export { createBuyer, deleteBuyer, updateBuyer };
