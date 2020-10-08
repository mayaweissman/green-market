const ShoppingCart = require("../models/shopping-cart");
const ProductInShoppingCart = require("../models/product-in-shopping-cart");
const Product = require("../models/product");
const { response } = require("express");

function openNewShoppingCart(shoppingCartToAdd) {
    return shoppingCartToAdd.save();
}

function addProductToShoppingCart(ProductToAdd) {
    return ProductToAdd.save();
}

function getShoppingCartForUser(userId) {
    return ShoppingCart.findOne({ "userId": userId }).exec();

}

async function getShoppingCartIncludingProductsAsync(shoppingCartId) {
    return ProductInShoppingCart.find({ "shoppingCartId": shoppingCartId }).populate("product").exec();
}

function deleteProductFromShoppingCartAsync(_id) {
    return ProductInShoppingCart.deleteOne({ _id }).exec();
}

async function updateProductInShoppingCart(productToUpdate) {
    const info = await ProductInShoppingCart.updateOne({ _id: productToUpdate._id }, productToUpdate).exec();
    return info.n ? productToUpdate : null;
}

async function deleteAllProductsFromShoppingCart(shoppingCartId) {
    return ProductInShoppingCart.deleteMany({ "shoppingCartId": shoppingCartId }).exec();
}





module.exports = {
    openNewShoppingCart,
    addProductToShoppingCart,
    getShoppingCartIncludingProductsAsync,
    getShoppingCartForUser,
    deleteProductFromShoppingCartAsync,
    updateProductInShoppingCart,
    deleteAllProductsFromShoppingCart
};