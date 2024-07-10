import "dotenv/config";
import mongoose from "mongoose";
import { Buyer } from "./models/Buyers";
import { Seller } from "./models/Sellers";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import compression from "compression";
import PassportLocal from "passport-local";
import passport from "passport";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import http from "http";
import { buyerRouter } from "./routes/buyers";
import { sellerRouter } from "./routes/sellers";
import { productRouter } from "./routes/products";
import handleRequest from "./webhook/route";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./utils/passportStrategies";
import ifAuthenticated from "./utils/passportStrategies"

const app = express();
app.use(
    cors({
        credentials: true,
    })
);
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1/buyer", buyerRouter);
app.use("/api/v1/seller", sellerRouter);
app.use("/api/v1/product", productRouter);

app.post("/api/v1/webhook", bodyParser.raw({ type: "application/json" }), handleRequest);

const server = http.createServer(app);

//Database Connection
const MONGO_URL: string = process.env.MONGODB_URL as string;
const connectDB = async () => {
    try {
        return await mongoose.connect(MONGO_URL);
    } catch (err) {
        console.log("Error connecting to database");
        console.log(err);
    }
};
const connection = connectDB();
console.log("Database state: " + mongoose.connection.readyState);

declare module "express-session" {
    interface SessionData {
        viewCount: number;
    }
}

app.use(
    session({
        secret: "some secret",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: MONGO_URL }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", ifAuthenticated, (req, res, next) => {
    if (req.session.viewCount) {
        req.session.viewCount = req.session.viewCount + 1;
    } else {
        req.session.viewCount = 1;
    }

    res.send("<h1>You have visited " + req.session.viewCount + " times </h1>");
});

app.get("/home", (req, res, next) => {
    res.send("<h1>Welcome home</h1>");
});

app.post("/testLogin", passport.authenticate("seller-local", { failureRedirect: "/", successRedirect: "/home" }));

app.post('/logout', (req, res, next) => {
	res.clearCookie('connect.sid'); 
	req.logout(function(err) {
		console.log(err)
		req.session.destroy(function (err) { // destroys the session
			res.send();
		});
	});
});

server.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});
