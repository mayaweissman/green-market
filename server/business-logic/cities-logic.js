const City = require("../models/city");

function getAllCitiesAsync() {
    return City.find().exec();
}

module.exports = {
   getAllCitiesAsync
};