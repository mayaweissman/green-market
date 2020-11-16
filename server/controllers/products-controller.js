const express = require("express");
const productsLogic = require("../business-logic/products-logic");
const Product = require("../models/product-model");
const { request, response } = require("express");
const isLoggedIn = require("../middleware/is-logged-in");
const isAdmin = require("../middleware/is-admin");
const uuid = require("uuid");
const fs = require("fs");

let uuidFileName = "";

const router = express.Router();

router.get("/", isLoggedIn, async (request, response) => {
    try {
        const products = await productsLogic.getAllProductsAsync();
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/categories", async (request, response) => {
    try {
        const categories = await productsLogic.getAllCategories();
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/count", async (request, response) => {
    try {
        const count = await productsLogic.getProductsCount();
        response.json(count);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


router.get("/search/:text", async (request, response) => {
    try {
        const products = await productsLogic.search(request.params.text);
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



router.get("/:productId", async (request, response) => {
    try {
        const productId = +request.params.productId;
        const product = await productsLogic.getOneProductAsync(productId);
        if (!product) {
            response.sendStatus(404);
            return;
        }
        response.json(product);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/category/:categoryId", async (request, response) => {
    try {
        const categoryId = +request.params.categoryId;
        const products = await productsLogic.getProductsByCategoryAsync(categoryId);
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

router.post("/add-new", isAdmin, async (request, response) => {
    try {
        const productToAdd = request.body;
        if (request.files) {
            const image = request.files.file;
            const extension = image.name.substr(image.name.lastIndexOf("."));
            const newFileName = uuid.v4() + extension;
            productToAdd.image = newFileName;
            image.mv("./uploads/" + newFileName);
        }
        const addedProduct = await productsLogic.addProductAsync(productToAdd);
        response.status(201).json(addedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



router.patch("/:productId", isAdmin, async (request, response) => {
    try {
        const productId = +request.params.productId;
        let fileName = request.body.image;
        if (request.body.image) {
            const image = request.body.image;
            const extension = image.substr(image.lastIndexOf("."));
            const newFileName = uuid.v4() + extension;
            fileName = newFileName;
        }

        const product = new Product(productId, request.body.name, request.body.price, fileName, request.body.categoryId);
        const updatedProduct = await productsLogic.updateProductAsync(product);
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

router.delete("/:productId", async (request, response) => {
    try {
        const productId = +request.params.productId;
        await productsLogic.deleteProductAsync(productId);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;

