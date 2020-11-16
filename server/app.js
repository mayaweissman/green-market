let originUrl;
if (process.env.NODE_ENV === "production") {
    global.config = require("./config-prod");
    originUrl = "https://green-market-shop.herokuapp.com";
}
else {
    global.config = require("./config-dev");
    originUrl = "http://localhost:4200";
}

require("./data-access-layer/dal");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const productsController = require("./controllers/products-controller");
const authController = require("./controllers/auth-controller");
const shoppingCartsController = require("./controllers/shopping-carts-controller");
const ordersController = require("./controllers/orders-controller");
const citiesController = require("./controllers/cities-controller");
const server = express();
const fileUpload = require("express-fileupload");
const { request, response } = require("express");
const { url } = require("inspector");


server.use(fileUpload());
server.use(express.json());
server.use(express.static(path.join(__dirname, "./_front-end")));

server.use(cors({
    origin: originUrl,
    credentials: true
}));


server.use(session({
    name: "OnlineMarketSession",
    secret: "itsASecret",
    resave: true,
    saveUninitialized: false,
}));

server.use("/api/products", productsController);
server.use("/api/shopping-carts", shoppingCartsController);
server.use("/api/orders", ordersController);
server.use("/api/auth", authController);
server.use("/api/cities", citiesController);

// Any other route - return index.html as we are SPA:
server.use("*", (request, response) => {
    response.sendFile(path.join(__dirname, "./_front-end/index.html"));
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));