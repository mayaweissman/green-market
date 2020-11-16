const dal = require("../data-access-layer/dal");
const { response } = require("express");

async function openNewShoppingCart(shoppingCartToAdd) {
    const sql = `INSERT INTO ShoppingCarts
    VALUES(DEFAULT, ${shoppingCartToAdd.userId}, '${shoppingCartToAdd.dateOfCreating}')`;
    const info = await dal.executeAsync(sql);
    shoppingCartToAdd.shoppingCartId = info.insertId;
    return shoppingCartToAdd;
}

async function addProductToShoppingCart(ProductToAdd) {
    const sql = `INSERT INTO productInShoppingCart
    VALUES(DEFAULT, ${ProductToAdd.amount},${ProductToAdd.price}, ${ProductToAdd.productId}, ${ProductToAdd.shoppingCartId})`;
    const info = await dal.executeAsync(sql);
    ProductToAdd.shoppingCartId = info.insertId;
    return ProductToAdd;
}

async function getShoppingCartForUser(userId) {
    const sql = `SELECT * FROM ShoppingCarts WHERE userId = ${userId}`;
    const shoppingCarts = await dal.executeAsync(sql);
    return shoppingCarts[0];
}

async function getShoppingCartIncludingProductsAsync(shoppingCartId) {
    const sql = `SELECT productInShoppingCart.* FROM productInShoppingCart JOIN shoppingCarts 
    ON productinshoppingcart.shoppingCartId = shoppingcarts.shoppingCartId WHERE productinshoppingcart.shoppingCartId =${shoppingCartId}`;
    const shoppingCarts = await dal.executeAsync(sql);
    return shoppingCarts;
}

async function deleteProductFromShoppingCartAsync(productInShoppingCartId) {
    const sql = `DELETE FROM productInShoppingCart WHERE productInShoppingCartId = ${productInShoppingCartId}`;
    await dal.executeAsync(sql);
}

async function updateProductInShoppingCart(productToUpdate) {
    let sql = `UPDATE productInShoppingCart SET `;
    if (productToUpdate.amount !== undefined) {
        sql += `amount = '${productToUpdate.amount}',`;
    }
    if (productToUpdate.price !== undefined) {
        sql += `price = '${productToUpdate.price}',`;
    }
    sql = sql.substr(0, sql.length - 1);
    sql += ` WHERE productInShoppingCartId  = ${productToUpdate.productInShoppingCartId}`;

    const info = await dal.executeAsync(sql);
    if (info.affectedRows) {
        return productToUpdate;
    }

    return null;
}

async function deleteAllProductsFromShoppingCart(shoppingCartId) {
    const sql = `DELETE FROM productInShoppingCart WHERE shoppingCartId = ${shoppingCartId}`;
    await dal.executeAsync(sql);
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