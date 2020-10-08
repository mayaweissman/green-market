const express = require("express");
const productsLogic = require("../business-logic/products-logic");
const Product = require("../models/product");
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



router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const product = await productsLogic.getOneProductAsync(_id);
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
        const categoryId = request.params.categoryId;
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
        const productToAdd = new Product(JSON.parse(request.body.info));
        console.log(request.body);

        if(request.files){
            const image = request.files.file;
            const extension = image.name.substr(image.name.lastIndexOf("."));
            const newFileName = uuid.v4() + extension;
            productToAdd.image = newFileName;
            image.mv("./uploads/" + newFileName);
        }


        const error = await productToAdd.validate();
        if (error) {
            response.status(400).send(error.message);
            return;
        }

        const addedProduct = await productsLogic.addProductAsync(productToAdd);
        response.status(201).json(addedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



router.patch("/:_id", isAdmin, async (request, response) => {
    try {
        const productToUpdate = new Product(JSON.parse(request.body.info));
        productToUpdate._id = request.params._id;

        if(productToUpdate.image !== "noImageEntered" && request.files){
            fs.unlink("./uploads/" + productToUpdate.image, (err)=>{
                if(err){
                    console.error(err);
                }
            })
        }

        if(request.files){
            const image = request.files.file;
            const extension = image.name.substr(image.name.lastIndexOf("."));
            const newFileName = uuid.v4() + extension;
            productToUpdate.image = newFileName;
            image.mv("./uploads/" + newFileName);
        }

        const updatedProduct = await productsLogic.updateProductAsync(productToUpdate);
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

router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await productsLogic.deleteProductAsync(_id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


router.get("/price-range/:minPrice/:maxPrice", async (request, response) => {
    try {
        const minPrice = +request.params.minPrice;
        const maxPrice = +request.params.maxPrice;
        const products = await productsLogic.getPriceRangeProductsAsync(minPrice, maxPrice);
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// router.post("/upload-image", isAdmin, async (request, response) => {
//     try {
//         console.log("hi");
//         if (!request.files) {
//             response.status(400).send("No file send");
//             return;
//         }
//         const image = request.files.adminImage;
//         image.mv("./uploads/" + uuidFileName);

//         response.end();
//     }
//     catch (err) {
//         response.status(500).send(err.massage);
//     }
// });




module.exports = router;

