const { request } = require("express");

const dal = require("../data-access-layer/dal");

async function getAllCitiesAsync() {
    const sql = `SELECT * FROM Cities`;
    const cities = await dal.executeAsync(sql);
    return cities;
}

module.exports = {
   getAllCitiesAsync
};