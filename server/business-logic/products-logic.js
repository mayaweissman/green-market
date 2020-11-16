const Product = require("../models/product-model");
const Category = require("../models/category-model");
const dal = require("../data-access-layer/dal");
const { response } = require("express");

async function getAllProductsAsync() {
    const sql = "SELECT * FROM products";
    const products = await dal.executeAsync(sql);
    return products;
}

async function getAllCategories() {
    const sql = "SELECT * FROM categories";
    const categories = await dal.executeAsync(sql);
    return categories;
}

async function getOneProductAsync(productId) {
    const sql = `SELECT * FROM products WHERE productId = ${productId}`;
    const products = await dal.executeAsync(sql);
    return products[0];
}

// Add new Product: 
async function addProductAsync(productToAdd) {
    const allProducts = await getAllProductsAsync();
    productToAdd.productId = allProducts.length;
    const sql = `INSERT INTO Products VALUES(${productToAdd.productId}, '${productToAdd.name}', 
    ${productToAdd.price}, '${productToAdd.image}', '${productToAdd.categoryId}')`;
    await dal.executeAsync(sql);
    return productToAdd;
}


async function updateProductAsync(productToUpdate) {
    let sql = `UPDATE Products SET `;
    if (productToUpdate.name !== undefined) {
        sql += `name = '${productToUpdate.name}',`;
    }
    if (productToUpdate.price !== undefined) {
        sql += `price = '${productToUpdate.price}',`;
    }
    if (productToUpdate.image !== undefined) {
        sql += `image = '${productToUpdate.image}',`;
    }
    if (productToUpdate.categoryId !== undefined) {
        sql += `categoryId = '${productToUpdate.categoryId}',`;
    }
    sql = sql.substr(0, sql.length - 1);
    sql += ` WHERE productId = ${productToUpdate.productId}`;

    const info = await dal.executeAsync(sql);
    if (info.affectedRows) {
        return productToUpdate;
    }

    return null;
};

// Delete existing product: 
async function deleteProductAsync(productId) {
    const sql = `DELETE FROM products WHERE productId = ${productId}`;
    const secSql = `DELETE FROM productsInShoppingCart WHERE productId = ${productId}`;
    await dal.executeAsync(secSql);
    await dal.executeAsync(sql);
}

async function getProductsIncludingCategoryAsync() {
    const sql = `SELECT * FROM products JOIN categories`;
    const products = await dal.executeAsync(sql);
    return products;}

async function getProductsByCategoryAsync(categoryId) {
    const sql = `SELECT * FROM products WHERE categoryId = ${categoryId}`;
    const products =await dal.executeAsync(sql);
    return products;
}

async function search(text) {
    const sql = `SELECT * FROM products WHERE name LIKE '%${text}%'`
    const products = await dal.executeAsync(sql);
    return products;
}

async function getProductsCount() {
    const sql = "SELECT COUNT(productId) AS productsCount FROM products";
    const products = await dal.executeAsync(sql);
    return products;
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