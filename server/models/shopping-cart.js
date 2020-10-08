const mongoose = require("mongoose");

const ShoppingCartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    dateOfCreating: {
        type: String
    }
},
    {
        versionKey: false,
        toJSON: { virtuals: true },
        id: false

    });

    ShoppingCartSchema.virtual("user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true
})

const ShoppingCart = mongoose.model("ShoppingCart", ShoppingCartSchema, "shoppingCarts");

module.exports = ShoppingCart;