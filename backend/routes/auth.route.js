module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const router = require("express").Router();

    router.post("/login", users.login);
    router.post("/signup", users.signup);

    app.use("/auth", router);
};