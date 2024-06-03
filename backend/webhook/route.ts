import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../utils/stripe";
import { Product } from "../models/Products";

const handleRequest = async (req: Request, res: Response) => {
  const sig: string | string[] | undefined = req.headers["stripe-signature"];

  let event;
  if (typeof sig === "string") {
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      ) as Stripe.Event;

      switch (
        event.type //get metadata for stuff like sending confirmation email and such
      ) {
        case "checkout.session.completed":
          const session = event.data.object as Stripe.Checkout.Session;
          console.log("Session :", session);
          console.log("checkout.session.completed");

          //from session get the product ids and the quantities and create transfers
          //by retrieving the price to transfer and the stripeid associated with the product; can check to see if total matches too
          //update data or send email

          if (session.metadata) {
            const productIdsArray = JSON.parse(session.metadata.product_ids);
            for (const entry of productIdsArray) {
              const { product_id, quantity } = entry;
              //from Products table get the price and the stripeid associated with the product.
              const productEntry = await Product.findOne({
                product_id: product_id,
              });
              if (productEntry) {
                const amount = productEntry.product_unit_price * 100 * quantity;
                const stripeId = productEntry.stripeID;

                const transfer = await stripe.transfers.create({
                  amount: amount,
                  currency: "cad",
                  destination: stripeId,
                });
              }
            }
          }

          res.status(200).send({ message: "Successful transaction" });
          break;
        case "checkout.session.async_payment_succeeded":
          break;
        case "checkout.session.async_payment_failed":
          break;
        default:
          console.log(event.type, "OK");
          res.status(200).send({ message: "OK" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }
  }
};

export default handleRequest;
