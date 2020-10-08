const Order = require("../models/order");
const { response } = require("express");

function createNewOrder(OrderToAdd) {
    return OrderToAdd.save();
}

function getOrdersCount() {
    return Order.countDocuments();
}

function getOrderIncludingUserIdIncludingShoppingCart(_id) {
    return Order.find({ _id }).populate("user").populate("shoppingCart").exec();
}

function getAllShippingDates() {
    return Order.find().exec();
}

function getOneOrder(_id){
    return Order.findOne({_id}).exec();
}

function getAllOrdersForUser(userId){
    return Order.find({"userId": userId}).exec();
}


module.exports = {
    createNewOrder,
    getOrdersCount,
    getOrderIncludingUserIdIncludingShoppingCart,
    getAllShippingDates,
    getOneOrder,
    getAllOrdersForUser
}