
const express = require("express");
const ordersLogic = require("../business-logic/orders-logic");
const shoppingCartLogic = require("../business-logic/shopping-carts-logic");
const Order = require("../models/order");
const { request, response } = require("express");
const shoppingCartsLogic = require("../business-logic/shopping-carts-logic");
const fs = require("fs");
const { FORMERR } = require("dns");

const router = express.Router();



router.post("/", async (request, response) => {
    try {
        const order = new Order(request.body);

        const creditCardNumber = order.FourDigitOfCreditCart.toString();
        let lastFourDigits = "";

        for (let i = (creditCardNumber.length - 4); i < creditCardNumber.length; i++) {
            lastFourDigits += creditCardNumber[i];
        }
        order.FourDigitOfCreditCart = +lastFourDigits;
        order.dateOfCreating = new Date().toLocaleDateString();


        const newOrder = await ordersLogic.createNewOrder(order);

        const shoppingCart = newOrder.shoppingCart;
        const user = newOrder.user;
        const products = await shoppingCartsLogic.getShoppingCartIncludingProductsAsync(shoppingCart._id);

        let productsText = ``;
        for (const p of products) {
            productsText += `\r\nProduct name: ${p.product.name} | Price: ${p.product.price} $ | Amount: ${p.amount} | Total Price: ${p.price} $`
        };
        fs.writeFileSync(`./receipts/${newOrder._id}.txt`, `
        Receipt for: ${user.firstName} ${user.lastName}!\r\n
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

router.get("/download/:orderId", async (request, response) => {
    try {
        const orderId = request.params.orderId;
        const file = `./receipts/${orderId}.txt`;
        response.download(file);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


router.get("/shipping-date", async (request, response) => {
    try {
        const shippingDates = [];
        const orders = await ordersLogic.getAllShippingDates();
        for (const o of orders) {
            shippingDates.push(o.dateOfShipping);
        }
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

router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const order = await ordersLogic.getOrderIncludingUserIdIncludingShoppingCart(_id);
        response.json(order);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/orders-for-user/:userId", async (request, response) => {
    try {
        const userId = request.params.userId;
        const orders = await ordersLogic.getAllOrdersForUser(userId);
        response.json(orders);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});




module.exports = router;

