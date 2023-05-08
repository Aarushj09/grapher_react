const db = require("../models");

exports.add_dataset = async (req, res) => {
    try {
        const { name, fields, data } = req.body;

        if (!fields || !data) {
            return res.status(400).json({
                success: false,
                message: "Missing fields and/or data!"
            });
        }

        // Create a table with the given fields as columns
        const table_name = `dataset_${name}_${Date.now()}`;
        const columns = {};

        fields.forEach(field => {
            columns[field] = {
                type: db.Sequelize.STRING
            };
        });

        const Dataset = db.sequelize.define(table_name, columns);

        db.sequelize.sync().then(() => {
            data.forEach(row => {
                Dataset.create(row);
            });

            db.user_dataset.create({
                user_email: req.user.email,
                dataset_name: table_name
            });

            return res.status(200).json({
                success: true,
                message: "Dataset created successfully!",
                dataset: {
                    id: table_name
                }
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
};

exports.get_datasets = async (req, res) => {
    // Fetch all datasets from the database. These are tables starting with "dataset_"
    // and ending with a timestamp
    let datasets = await db.user_dataset.findAll({
        where: {
            user_email: req.user.email
        }
    });

    return res.status(200).json({
        success: true,
        message: "Datasets fetched successfully!",
        datasets: datasets
    });
};

exports.get_dataset = async (req, res) => {};