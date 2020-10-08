const express = require("express");
const citiesLogic = require("../business-logic/cities-logic");


const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const cities = await citiesLogic.getAllCitiesAsync();
        response.json(cities);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;

