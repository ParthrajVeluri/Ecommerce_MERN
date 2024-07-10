import passport from "passport";
import PassportLocal from "passport-local";
import bcrypt from "bcrypt";
import { Buyer } from "../models/Buyers";
import { Seller } from "../models/Sellers";
import { Request, Response, NextFunction } from 'express';

export default function ifAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/home');
    }
}
passport.use(
    "buyer-local",
    new PassportLocal.Strategy({ usernameField: "email" }, async (email: string, password: string, done) => {
        try {
            if (!email) {
                done(null, false);
            }
            const user = await Buyer.findOne({ email: email }).select("+authentication.password");
            if (!user || !user.authentication) {
                done(null, false);
            } else {
                if (await bcrypt.compare(password, user.authentication.password)) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            }
        } catch (e) {
            done(e);
        }
    })
);

passport.use(
    "seller-local",
    new PassportLocal.Strategy({ usernameField: "email" }, async (email: string, password: string, done) => {
        try {
            if (!email) {
                done(null, false);
            }
            const user = await Seller.findOne({ email: email }).select("+authentication.password");
            if (!user || !user.authentication) {
                done(null, false);
            } else {
                if (await bcrypt.compare(password, user.authentication.password)) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            }
        } catch (e) {
            done(e);
        }
    })
);

passport.serializeUser((user: any, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id: any, done) => {
    try {
        let user = await Buyer.findById(id);

        if (!user) {
            user = await Seller.findById(id);
            console.log("Seller: " + user);
        } else {
            console.log("Buyer:" + user);
        }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (err) {
        done(err);
    }
});
