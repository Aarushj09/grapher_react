const auth = require("../middleware/auth.js");

module.exports = app => {
    const datasets = require("../controllers/dataset.controller.js");
    const router = require("express").Router();

    router.get("/", auth, datasets.get_datasets);
    router.post("/create", auth, datasets.add_dataset);

    app.use("/datasets", router);
};