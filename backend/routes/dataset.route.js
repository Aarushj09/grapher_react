const auth = require("../middleware/auth.js");

module.exports = app => {
    const datasets = require("../controllers/dataset.controller.js");
    const graphs = require("../controllers/graph.controller.js");
    const router = require("express").Router();

    router.get("/", auth, datasets.get_datasets);
    router.get("/:dataset_id", auth, datasets.get_dataset);
    router.post("/create", auth, datasets.add_dataset);
    router.get("/:dataset_id/graphs", auth, graphs.get_graphs);

    app.use("/datasets", router);
};