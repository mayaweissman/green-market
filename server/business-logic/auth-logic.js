const User = require("../models/user-model");
const { response } = require("express");
const dal = require("../data-access-layer/dal");

function getAllUsersAsync() {
    const sql = `SELECT * FROM Users`;
    const users = dal.executeAsync(sql);
    return users;
}

async function login(credentials) {
    const sql = `SELECT * FROM Users
        WHERE email = '${credentials.email}'
        AND password = '${credentials.password}'`;
    const users = await dal.executeAsync(sql);
    const user = users[0];
    return user;
}

async function getOneUser(userId){
    const sql = `SELECT * FROM users WHERE userId = ${userId}`;
    const users = await dal.executeAsync(sql);
    return users[0];
}

async function register(user) {
    const allUsers = await getAllUsersAsync();
    user.userId = allUsers.length;
    const sql = `INSERT INTO Users VALUES(
        ${user.userId},
        '${user.firstName}',
        '${user.lastName}',
        '${user.email}',
         ${user.idNumber},
        '${user.password}',
        '${user.city}',
        '${user.address}',
        'Client')`;
    await dal.executeAsync(sql);
    return user;
}


module.exports = {
    getAllUsersAsync,
    login,
    register,
    getOneUser
};