const User = require("../models/user");
const { response } = require("express");

function getAllUsersAsync() {
    return User.find().exec();
}


function login(credentials) {
    return User.findOne({ "email": credentials.email, "password": credentials.password }).exec();
}


function register(userToAdd) {
    return userToAdd.save();
}


module.exports = {
  getAllUsersAsync,
  login,
  register
};