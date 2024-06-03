import { Request, Response } from "express";
import { Seller } from "../models/Sellers";
import { Product } from "../models/Products";
import { stripe } from "../utils/stripe";
import Stripe from "stripe";

interface createProductBody {
  email: string;
  product_name: string;
  description?: string;
  image?: string;
  unit_price?: number;
}

const roundTo = function (num: number, places: number) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
};

async function createProduct(req: Request, res: Response) {
  try {
    const {
      email,
      product_name,
      description,
      image,
      unit_price,
    }: createProductBody = req.body;

    const parameters: Stripe.ProductCreateParams = {
      name: product_name,
      active: true,
      ...(description && { description }),
      ...(image && { images: [image] }),
    };

    const seller = await Seller.findOne({ email: email });

    if (seller) {
      const stripeID = seller.stripeID;

      //create in hub
      const product = await stripe.products.create(parameters);
      const productid = product.id;

      //create in connect acc
      parameters.id = productid;
      const productConnect = await stripe.products.create(parameters, {
        stripeAccount: stripeID,
      });

      console.log(product); // Log product details to ensure it is created successfully

      if (unit_price !== undefined) {
        const rounded_price = roundTo(unit_price, 2);
        //create price object
        const price = rounded_price * 100;

        //create price object in hub
        const price_obj = await stripe.prices.create({
          currency: "CAD",
          product: product.id,
          unit_amount: price, //Assuming it's in dollar value
        });

        //create product entry in db
        const productEntry = await Product.create({
          product_name: parameters.name,
          product_description: parameters.description,
          product_unit_price: rounded_price,
          product_image: parameters.images,
          product_id: product.id,
          price_id: price_obj.id,
          stripeID: stripeID,
        });

        //create price obj in connect acc
        const price_obj_connect = await stripe.prices.create(
          {
            currency: "CAD",
            product: productConnect.id,
            unit_amount: price, //Assuming it's in dollar value
          },
          {
            stripeAccount: stripeID,
          }
        );
        console.log(price_obj);
      }

      return res.status(200).send({ product });
    } else {
      console.log("Seller not found");
      return res.status(404).send({ error: "Seller not found" });
    }
  } catch (error) {
    return res.status(500).send({ error: (error as Error).toString() });
  }
}

interface updatePriceBody {
  unit_price: number;
}

async function updatePrice(req: Request, res: Response) {
  try {
    const { unit_price, active, product_id } = req.body;
    const price = await stripe.prices.create({
      currency: "CAD",
      product: product_id,
      unit_amount: unit_price,
    });
    console.log(price);
    return res.status(200).send({ price });
  } catch (error) {
    return res.status(500).send({ error: (error as Error).toString() });
  }
}

interface UpdateProductRequestBody {
  email: string;
  product_id: string;
  product_name?: string;
  description?: string;
  images?: [string];
  default_price?: number;
  active?: boolean;
}

async function updateProduct(req: Request, res: Response) {
  try {
    const {
      email,
      product_id,
      product_name,
      description,
      images,
      default_price,
      active,
    }: UpdateProductRequestBody = req.body;

    const updateFields: { [key: string]: any } = {};

    if (description !== undefined) {
      updateFields.description = description;
    }

    if (product_name !== undefined) {
      updateFields.name = product_name;
    }

    if (images !== undefined) {
      updateFields.images = [images]; //images using amazon s3
    }

    if (default_price !== undefined) {
      updateFields.default_price = default_price;
    }

    if (active !== undefined) {
      updateFields.active = active;
    }

    const seller = await Seller.findOne({ email: email });
    if (seller) {
      const stripeID = seller.stripeID;

      const match = await Product.findOne({
        stripeID: stripeID,
        product_id: product_id,
      });

      if (match) {
        const product = await stripe.products.update(product_id, updateFields);

        const product_connect = await stripe.products.update(
          product_id,
          updateFields,
          {
            stripeAccount: stripeID,
          }
        );
        return res.status(200).send({ product });
      }
    } else {
      console.log("Seller not found");
      return res.status(404).send({ error: "Seller not found" });
    }
  } catch (error) {
    return res.status(500).send({ error: (error as Error).toString() });
  }
}

async function retrieveProductsFromSeller(req: Request, res: Response) {
  try {
    const { email } = req.body;

    const seller = await Seller.findOne({ email: email });

    if (seller) {
      const stripeID = seller.stripeID;

      const products = await stripe.products.list(
        {
          limit: 10,
        },
        {
          stripeAccount: stripeID,
        }
      );
      return res.status(200).send({ products });
    } else {
      return res.status(400).send({ message: "Products not found" });
    }
  } catch (e) {
    return res.status(500).send({ error: (e as Error).toString() });
  }
}

async function createSession(req: Request, res: Response) {
  try {
    const { products } = req.body;

    //map product ids to the associated price id in the db for each product given in the req body

    const lineItems: Array<{ price: string; quantity: number }> = [];

    const productIds: Array<{ product_id: string; quantity: number }> = [];

    for (const product of products) {
      const { product_id, quantity } = product;
      const result = await Product.findOne({ product_id: product_id });
      if (result) {
        const priceId = result.price_id;
        lineItems.push({ price: priceId, quantity: quantity });
        productIds.push({ product_id: product_id, quantity: quantity });
      }
    }

    console.log(lineItems);
    const productIdsString = JSON.stringify(productIds);

    //create session of line items
    const session = await stripe.checkout.sessions.create({
      success_url: "https://example.com/success",
      line_items: lineItems,
      mode: "payment",
      payment_method_types: ["card"],
      metadata: {
        product_ids: productIdsString,
      },
    });

    return res.status(200).send({ session });
  } catch (error) {
    return res.status(500).send({ error: (error as Error).toString() });
  }
}

export {
  createProduct,
  updateProduct,
  retrieveProductsFromSeller,
  updatePrice,
  createSession,
};
