const multer = require('multer');

module.exports = app => {
    const datasets = require("../controllers/dataset.controller.js");
    const router = require("express").Router();

    router.post("/create", multer().single('file'), datasets.add_dataset);

    app.use("/datasets", router);
};