const Order = require("../models/order-model");
const dal = require("../data-access-layer/dal");
const { response } = require("express");


async function createNewOrder(OrderToAdd) {
    const sql = `INSERT INTO Orders
     VALUES(DEFAULT, ${OrderToAdd.userId}, ${OrderToAdd.shoppingCartId},${OrderToAdd.totalPrice}, '${OrderToAdd.city}', '${OrderToAdd.address}', '${OrderToAdd.dateOfShipping}', 
    '${OrderToAdd.dateOfCreating}', ${OrderToAdd.FourDigitOfCreditCart})`;
    const info = await dal.executeAsync(sql);
    OrderToAdd.orderId = info.insertId;
    return OrderToAdd;
}

async function getAllOrders(){
    const sql = "SELECT * FROM orders";
    const orders = await dal.executeAsync(sql);
    return orders;
}

async function getOrdersCount() {
    const sql = "SELECT COUNT(orderId) AS ordersCount FROM orders";
    const count = await dal.executeAsync(sql);
    return count;
}

async function getOrderIncludingUserIdIncludingShoppingCart(order) {
    const sql = `SELECT * FROM orders JOIN users JOIN shoppingCarts 
    WHERE orders.orderId = ${order.orderId} AND users.userId = ${order.userId} AND shoppingcarts.shoppingCartId = ${order.shoppingCartId}`;
    const orders = await dal.executeAsync(sql);
    return orders;
}

async function getAllShippingDates() {
    const sql = `SELECT dateOfShipping FROM orders`;
    const orders = await dal.executeAsync(sql);
    return orders;
}

async function getOneOrder(orderId) {
    const sql = `SELECT * FROM orders WHERE orderId = ${orderId}`;
    const orders = await dal.executeAsync(sql);
    return orders[0];
}

async function getAllOrdersForUser(userId) {
    const sql = `SELECT * FROM orders WHERE userId = ${userId}`;
    const orders = await dal.executeAsync(sql);
    return orders;
}


module.exports = {
    createNewOrder,
    getOrdersCount,
    getOrderIncludingUserIdIncludingShoppingCart,
    getAllShippingDates,
    getOneOrder,
    getAllOrdersForUser,
    getAllOrders
}