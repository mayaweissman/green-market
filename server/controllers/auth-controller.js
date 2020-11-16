const express = require("express");
const authLogic = require("../business-logic/auth-logic");
const User = require("../models/user-model");
const { request, response } = require("express");

const router = express.Router();


router.post("/login", async (request, response) => {
    try {
        const credentials = request.body;
        const user = await authLogic.login(credentials);
        if (!user) {
            response.status(401).send("Illegal username or password");
            return;
        }
        request.session.user = user;
        response.json(user);
    }
    catch (err) {
        response.status(500).send(err.message);
        console.log(err.message);
    }
});


router.post("/logout", (request, response) => {
    try {
        request.session.destroy();
        response.end();
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



router.post("/register", async (request, response) => {
    try {
        const user = new User(
            0,
            request.body.firstName,
            request.body.lastName,
            request.body.email,
            request.body.idNumber,
            request.body.password,
            request.body.city,
            request.body.address,
            "Client"); 
        const addedUser = await authLogic.register(user);


        request.session.user = addedUser;
        response.status(201).json(addedUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


router.get("/isLogged", (request, response) => {
    if (request.session.user === undefined) {
        response.status(401).send("not logged in");
        return;
    }
    response.json(request.session.user);

});

router.get("/", async (request, response) => {
    try {
        const users = await authLogic.getAllUsersAsync();
        response.json(users);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
})


module.exports = router;

