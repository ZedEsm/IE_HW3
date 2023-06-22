import express, { json, urlencoded } from "express";
import rateLimit from 'express-rate-limit';
import cors from "cors";
import "dotenv/config";

import db from "./app/models/index.js";
import ActivateRoutes from "./app/routes/index.js";
import createResponse from "./app/utils/create-response.js";

const PORT = process.env.PORT || 3000;
const app = express();

// rate limit middleware
const requestRateLimit = rateLimit({
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(requestRateLimit);

// middlewares
app.use(cors({ origin: "http://127.0.0.1:3001" }));
app.use(json());
app.use(urlencoded({ extended: true }));


try {
    // connect to database and listen at PORT
    const connectToDB = db.mongoose.connect(db.url, db.option);
    const listen = app.listen(PORT);

    await Promise.all([connectToDB, listen]);
    console.log(
        `connected to database, Server is running at http://localhost:${PORT}`
    );
} catch (err) {
    console.log(
        err.message ||
            "Can't Connect to database or Open a tcp socket connection"
    );
}

// activate all routes
ActivateRoutes(app);

// if requested api don't match with other Apis
app.use((req, res) => {
    return res.status(404).json(createResponse(false,
        "Api does not exist"))
});
