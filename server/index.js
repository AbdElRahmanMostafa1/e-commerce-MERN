const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// const passport = require("passport");
const { auth, admin, seller } = require("./middleware/auth");

// Configs
dotenv.config();
require("./db/db");

// Imports

// Constants
const app = express();
const PORT = process.env.PORT;
const ROUTE = process.env.ROUTE;

// Middleware
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

// Shared Routes
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");

// Admin Routes
const adminRoutes = require("./routes/admin/usersRoute");

// Middleware
app.use(cors());
app.use(express.json());

// app.use(passport.initialize());
// require("./middleware/passport-config");

app.use(`${ROUTE}/auth`, authRoute);
app.use(`${ROUTE}`, productRoute);
app.use(`${ROUTE}/user`, auth, userRoute);
app.use(`${ROUTE}`, auth, orderRoute);

// Admin
app.use(`${ROUTE}/admin`, auth, admin, adminRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Your Server is running on port ${PORT}`));
