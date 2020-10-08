const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: String,
}, {
    versionKey: false
});

const Category = mongoose.model("Category", CategorySchema, "categories");

module.exports = Category;