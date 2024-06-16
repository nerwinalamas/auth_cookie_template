const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db");
const authRoute = require("./routes/auth.route");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: [
            process.env.FE_ORIGIN_DEVELOPMENT,
            process.env.FE_ORIGIN_PRODUCTION,
        ],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app.use("/", authRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
