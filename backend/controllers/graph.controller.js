const db = require("../models");

exports.add_graph = async (req, res) => {
    const { x_axis, y_axis, graph_type, dataset_name } = req.body;

    if (!x_axis || !y_axis || !graph_type || !dataset_name) {
        return res.status(400).json({
            success: false,
            message: "Missing fields! Please fill in all fields."
        });
    }

    // Check if the dataset exists
    const dataset = await db.user_dataset.findOne({
        where: {
            user_email: req.user.email,
            dataset_name: dataset_name
        }
    });

    if (!dataset) {
        return res.status(400).json({
            success: false,
            message: "Dataset not found!"
        });
    }

    try {
        // Create a graph in the database
        await db.graph.create({
            user_email: req.user.email,
            dataset_name: dataset_name,
            x_axis: x_axis,
            y_axis: y_axis,
            graph_type: graph_type
        });

        return res.status(200).json({
            success: true,
            message: "Graph created successfully!"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
};

// Fetch all graphs from the database for the dataset
exports.get_graphs = async (req, res) => {
    try {
        const graphs = await db.graph.findAll({
            where: {
                user_email: req.user.email,
                dataset_name: req.params.dataset_id
            }
        });

        return res.status(200).json({
            success: true,
            message: "Graphs fetched successfully!",
            graphs: graphs
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    };
};