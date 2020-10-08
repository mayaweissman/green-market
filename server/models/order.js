const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    shoppingCartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShoppingCart",
    },
    totalPrice: {
        type: Number,
        required: [true, "Missing amount"]
    },
    city: {
        type: String,
        required: [true, "Missing city"]
    },
    address: {
        type: String,
        required: [true, "Missing address"]
    },
    dateOfShipping: {
        type: String,
        required: [true, "Missing shipping date"]
    },
    dateOfCreating: {
        type: String,
        required: [true, "Missing creating date"]
    },
    FourDigitOfCreditCart: {
        type: Number,
        required: [true, "Missing 4 digit of credit card"],
        min: [1000, "Need more then 3 digit of credit cart"],
        max: [9999, "Need exactly 4 number of credit cart"]
    }
},
    {
        versionKey: false,
        toJSON: { virtuals: true },
        id: false

    });

OrderSchema.virtual("user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true
})

OrderSchema.virtual("shoppingCart", {
    ref: "ShoppingCart",
    localField: "shoppingCartId",
    foreignField: "_id",
    justOne: true
})

const Order = mongoose.model("Order", OrderSchema, "orders");

module.exports = Order;