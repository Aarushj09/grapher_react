const auth = require("../middleware/auth.js");

module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const router = require("express").Router();

    router.get("/user", auth, users.get_user);
    router.post("/login", users.login);
    router.post("/signup", users.signup);

    app.use("/auth", router);
};