const Product = require("../models/product");
const Category = require("../models/category");
const { response } = require("express");

function getAllProductsAsync() {
    return Product.find().exec();
}

function getAllCategories(){
    return Category.find().exec();
}

function getOneProductAsync(_id) {
    return Product.findOne({ _id }).exec();
}

// Add new Product: 
function addProductAsync(productToAdd) {
    return productToAdd.save(); //Save returns a Promise
}

async function updateProductAsync(productToUpdate) {
    const info = await Product.updateOne({ _id: productToUpdate._id }, productToUpdate).exec();
    return info.n ? productToUpdate : null;
}


// Delete existing product: 
function deleteProductAsync(_id) {
    return Product.deleteOne({ _id }).exec();
}

function getProductsIncludingCategoryAsync() {
    return Product.find().populate("category").exec();
}

function getProductsByCategoryAsync(categoryId) {
    return Product.find({"categoryId": categoryId}).exec();
}

function search(text) {
    return Product.find({ name: { $regex: text, $options: "i" } }).exec();
}

function getProductsCount(){
    return Product.countDocuments();
}

module.exports = {
    getAllProductsAsync,
    getOneProductAsync,
    addProductAsync,
    updateProductAsync,
    deleteProductAsync,
    getProductsIncludingCategoryAsync,
    getProductsByCategoryAsync,
    getAllCategories,
    search,
    getProductsCount
};