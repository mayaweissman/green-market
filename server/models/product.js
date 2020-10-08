const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [3, "Name too short"],
        maxlength: [100, "Name too long"]
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price can't be exceed 1000"]
    },
    image: {
        type: String,
        required: [true, "Missing image"]
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false 
});

ProductSchema.virtual("category", {
    ref: "Category",
    localField: "categoryId",
    foreignField: "_id",
    justOne: true 
})

const Product = mongoose.model("Product", ProductSchema, "products");

module.exports = Product;