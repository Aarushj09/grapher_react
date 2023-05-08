const auth = require("../middleware/auth.js");

module.exports = app => {
    const graphs = require("../controllers/graph.controller.js");
    const router = require("express").Router();

    router.post("/create", auth, graphs.add_graph);

    app.use("/graphs", router);
}