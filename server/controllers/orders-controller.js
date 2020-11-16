const express = require("express");
const ordersLogic = require("../business-logic/orders-logic");
const productsLogic = require("../business-logic/products-logic");
const authLogic = require("../business-logic/auth-logic");
const Order = require("../models/order-model");
const { request, response } = require("express");
const shoppingCartsLogic = require("../business-logic/shopping-carts-logic");
const fs = require("fs");
const { FORMERR } = require("dns");
const { get } = require("http");

const router = express.Router();


router.post("/", async (request, response) => {
    try {
        const order = request.body;

        const creditCardNumber = order.FourDigitOfCreditCart.toString();
        let lastFourDigits = "";

        for (let i = (creditCardNumber.length - 4); i < creditCardNumber.length; i++) {
            lastFourDigits += creditCardNumber[i];
        }
        order.FourDigitOfCreditCart = +lastFourDigits;
        order.dateOfCreating = new Date().toLocaleDateString();

        const newOrder = await ordersLogic.createNewOrder(order);
        const shoppingCart = await shoppingCartsLogic.getShoppingCartForUser(newOrder.userId);
        const user = await authLogic.getOneUser(newOrder.userId);
        const products = await shoppingCartsLogic.getShoppingCartIncludingProductsAsync(shoppingCart.shoppingCartId);

        let productsText = ``;
        for (const p of products) {
            productsText += `\r\nProduct name: ${getProductByProductId(p.productId).name} | Price: ${getProductByProductId(p.productId).price} $ | Amount: ${p.amount} | Total Price: ${p.price} $`
        };
        fs.writeFileSync(`./receipts/${newOrder.orderId}.txt`, `
        Receipt for: ${user.firstname} ${user.lastname}!\r\n
        Payment date: ${newOrder.dateOfCreating}\r\n
        Pay with: ${newOrder.FourDigitOfCreditCart}\r\n
        ------------------------------------\r\n
        ${productsText}\r\n
        ------------------------------------\r\n
        Total price: ${newOrder.totalPrice} $`);

        response.status(201).json(newOrder);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

const getProductByProductId = async (productId) => {
    const product = await productsLogic.getOneProductAsync(productId);
    return product;
}


router.get("/download/:orderId", async (request, response) => {
    try {
        const orderId = +request.params.orderId;
        const file = `./receipts/${orderId}.txt`;
        response.download(file);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


router.get("/shipping-date", async (request, response) => {
    try {
        const shippingDates = await ordersLogic.getAllShippingDates();
        response.json(shippingDates);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/count", async (request, response) => {
    try {
        const count = await ordersLogic.getOrdersCount();
        response.json(count);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



router.get("/", async (request, response) => {
    try {
        const orders = await ordersLogic.getAllOrders();
        response.json(orders);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/:orderId", async (request, response) => {
    try {
        const orderId = +request.params.orderId;
        const orderDetails = await ordersLogic.getOneOrder(orderId);
        const order = await ordersLogic.getOrderIncludingUserIdIncludingShoppingCart(orderDetails);
        response.json(order);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/orders-for-user/:userId", async (request, response) => {
    try {
        const userId = +request.params.userId;
        const orders = await ordersLogic.getAllOrdersForUser(userId);
        response.json(orders);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



module.exports = router;


