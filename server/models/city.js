const mongoose = require("mongoose");

const CitySchema = mongoose.Schema({
    name: String,
}, {
    versionKey: false
});

const City = mongoose.model("City", CitySchema, "cities");

module.exports = City;