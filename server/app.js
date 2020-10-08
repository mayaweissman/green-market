global.config = require("./config.json");
require("./data-access-layer/dal");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const productsController = require("./controllers/products-controller"); 
const authController = require("./controllers/auth-controller"); 
const shoppingCartsController = require("./controllers/shopping-carts-controller"); 
const ordersController = require("./controllers/orders-controller"); 
const citiesController = require("./controllers/cities-controller"); 
const server = express(); 
const fileUpload = require("express-fileupload");


server.use(fileUpload());
server.use(express.json()); 
server.use(express.static(__dirname));

server.use(cors({
    origin: "http://localhost:4200",
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
server.use("*", (request, response) => response.sendStatus(404)); 

server.listen(3000, ()=>console.log("Listening on http://localhost:3000"));
