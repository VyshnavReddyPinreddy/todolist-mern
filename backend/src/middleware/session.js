import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config();

export const sessionMiddleware = session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false,
    cookie:{
        httpOnly : true,
        secure : false,
        maxAge : 1000*60*60*24,
    },
    store: MongoStore.create({
        mongoUrl : process.env.MONGO_URI,
        collectionName : 'sessions',
        ttl : 60*60*24,
    }),
});