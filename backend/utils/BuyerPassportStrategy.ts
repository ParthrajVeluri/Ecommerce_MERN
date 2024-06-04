import passport from "passport";
import PassportLocal from "passport-local";
import bcrypt from "bcrypt";
import { Buyer } from "../models/Buyers";
import { Seller } from "../models/Sellers";

passport.use(
    new PassportLocal.Strategy({ usernameField: "email" }, async (email, password, done) => {
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
                }else{
                    done(null, false);
                }
            }
        } catch {}
    })
);
