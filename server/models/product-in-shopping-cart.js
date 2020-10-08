const mongoose = require("mongoose");

const ProductInShoppingCartSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    shoppingCartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShoppingCart",
    },
    amount: {
        type: Number,
        required: [true, "Missing amount"],
        min: [0, "Amount can't be negative"],
        max: [20, "Amount can't be exceed 20"]
    },
    price: {
        type: Number,
        required: [true, "Missing price"]
    }
},
    {
        versionKey: false,
        toJSON: { virtuals: true },
        id: false

    });

ProductInShoppingCartSchema.virtual("product", {
    ref: "Product",
    localField: "productId",
    foreignField: "_id",
    justOne: true
})

ProductInShoppingCartSchema.virtual("shoppingCart", {
    ref: "ShoppingCart",
    localField: "shoppingCartId",
    foreignField: "_id",
    justOne: true
})

const ProductInShoppingCart = mongoose.model("ProductInShoppingCart", ProductInShoppingCartSchema, "productsInShoppingCart");

module.exports = ProductInShoppingCart;