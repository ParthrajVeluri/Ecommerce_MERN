import { Request, Response } from "express";
import mongoose from "mongoose";
import { Seller } from "../models/Sellers";
import { random, authentication } from "../utils/auth";
import { stripe } from "../utils/stripe";

async function createSeller(req: Request, res: Response) {
  try {
    const { name, country, email, password, phone, address } = req.body;

    if (!country || !email) {
      return res.status(400).send({ error: "Country and email are required" });
    }

    /*const account = await stripe.accounts.create({
      type: "custom",
      country: "US",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_type: "individual",
      external_account: {
        object: "bank_account",
        country: country,
        currency: "usd",
        routing_number: "110000000",
        account_number: "000123456789",
      },
      tos_acceptance: { date: 1609798905, ip: "8.8.8.8" },
      business_profile: { mcc: 5045, url: "https://bestcookieco.com" },
      individual: {
        first_name: "Test",
        last_name: "User",
        phone: "+16505551234",
        email: email,
        id_number: "222222222",
        address: {
          line1: "123 State St",
          city: "Schenectady",
          postal_code: "12345",
          state: "NY",
        },
        dob: {
          day: 10,
          month: 11,
          year: 1980,
        },
      },
    });*/

    //check if existing account exists here

    const existing_seller = await Seller.findOne({ email: email });

    if (existing_seller) {
      res.status(400).send({ message: "Email already exists with account" });
    } else {
      const account = await stripe.accounts.create({
        type: "express",
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        email: email,
        country: "CA",
      });

      const stripeID = account.id;

      const accountLink = await stripe.accountLinks.create({
        account: `${stripeID}`,
        refresh_url: "https://example.com/reauth", //TODO: refresh url
        return_url: "https://example.com/return", //TODO: redirect url
        type: "account_onboarding",
        collection_options: {
          fields: "eventually_due",
        },
      });

      const salt = random();
      const sellerEntry = await Seller.create({
        name: name,
        email: email,
        authentication: {
          password: authentication(salt, password),
          salt,
        },
        address: address,
        phone: phone,
        stripeID: stripeID,
      });

      console.log(sellerEntry);

      return res.status(200).send({ accountLink });
    }
  } catch (e) {
    return res.status(500).send({ error: (e as Error).toString() });
  }
}

async function deleteSeller(req: Request, res: Response) {
  try {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Log the incoming email
    console.log(`Attempting to delete account with email: ${email}`);

    const seller_to_del = await Seller.findOne({ email: email });

    // Check if the account exists
    if (!seller_to_del) {
      console.log(`Account with email ${email} not found.`);
      return res.status(400).json({ message: "Account not found." });
    } else {
      const stripeID = seller_to_del.stripeID;
      await stripe.accounts.del(stripeID);
      await Seller.deleteOne({ email: email });
      console.log(`Account with email ${email} successfully deleted.`);
      return res.status(200).json({ message: "Account successfully deleted." });
    }
  } catch (e) {
    return res.status(500).send({ error: (e as Error).toString() });
  }
}

export { createSeller, deleteSeller };
