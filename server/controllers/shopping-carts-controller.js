const express = require("express");
const shoppingCartsLogic = require("../business-logic/shopping-carts-logic");
const ShoppingCart = require("../models/shopping-cart");
const ProductInShoppingCart = require("../models/product-in-shopping-cart");
const { request, response } = require("express");
const isLoggedIn = require("../middleware/is-logged-in");

const router = express.Router();


router.get("/products/:shoppingCartId", async (request, response) => {
    try {
        const shoppingCartId = request.params.shoppingCartId;
        const products = await shoppingCartsLogic.getShoppingCartIncludingProductsAsync(shoppingCartId);
        if (!products) {
            response.sendStatus(404);
            return;
        }
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



router.get("/cart/:userId", async (request, response) => {
    try {
        const userId = request.params.userId;
        const shoppingCart = await shoppingCartsLogic.getShoppingCartForUser(userId);
        if (!shoppingCart) {
            response.json("No shopping cart for user");
            return;
        }
        response.json(shoppingCart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


router.post("/new", async (request, response) => {
    try {
        const shoppingCart = new ShoppingCart(request.body);
        shoppingCart.dateOfCreating = new Date().toLocaleDateString();
        const newShoppingCart = await shoppingCartsLogic.openNewShoppingCart(shoppingCart);
        response.status(201).json(newShoppingCart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/add-product", async (request, response) => {
    try {
        const productInShoppingCart = new ProductInShoppingCart(request.body);
        const addedProductInShoppingCart = await shoppingCartsLogic.addProductToShoppingCart(productInShoppingCart);
        response.status(201).json(addedProductInShoppingCart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await shoppingCartsLogic.deleteProductFromShoppingCartAsync(_id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
})

router.delete("/delete-all/:shoppingCartId", async (request, response) => {
    try {
        const shoppingCartId = request.params.shoppingCartId;
        await shoppingCartsLogic.deleteAllProductsFromShoppingCart(shoppingCartId);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
})

router.patch("/:_id", async (request, response) => {
    try {
        const productToUpdate = new ProductInShoppingCart(request.body);
        productToUpdate._id = request.params._id;

        const updatedProduct = await shoppingCartsLogic.updateProductInShoppingCart(productToUpdate);
        if (!updatedProduct) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});





module.exports = router;

