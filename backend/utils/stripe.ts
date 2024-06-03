import Stripe from "stripe";

export const stripe = new Stripe(process.env.stripe_test_key!);
