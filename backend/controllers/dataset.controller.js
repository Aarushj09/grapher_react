const csv = require('csv-parser');
const fs = require('fs');
const db = require("../models");

exports.add_dataset = async (req, res) => {
    try {
        // The dataset would be in the form of an uploaded CSV file
        const file = req.file;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded!"
            });
        }

        if (file.mimetype !== "text/csv") {
            return res.status(400).json({
                success: false,
                message: "Invalid file type!"
            });
        }

        // // If filename already exists as a table, return an error
        // const dataset = await db.sequelize.query(`SELECT name FROM sqlite_master WHERE type='table' AND name='${file.filename.split(".")[0]}'`);
        // if (dataset[0].length > 0) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Dataset with that name already exists!"
        //     });
        // }

        // // The dataset would be stored in the database as a table
        // // The table name would be the same as the filename
        // const table_name = file.filename.split(".")[0];
        // const table = db.sequelize.define(table_name, {}, { timestamps: false });

        // // The table would have a column for each column in the CSV file
        // fs.createReadStream(file.path)
        //     .pipe(csv())
        //     .on('data', async (row) => {
        //         for (const [column_name, value] of Object.entries(row)) {
        //             await table.addColumn(column_name, { type: db.Sequelize.STRING });
        //         }

        //         await table.create(row);
        //     })
        //     .on('end', () => {
        //         return res.status(200).json({
        //             success: true,
        //             message: "Dataset added successfully!"
        //         });
        //     });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
};

exports.get_datasets = async (req, res) => { };

exports.get_dataset = async (req, res) => { };