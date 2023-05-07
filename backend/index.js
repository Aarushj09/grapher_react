const express = require('express');
const cors = require('cors');
const db = require("./models");

// Create Express app
const app = express();

// Loading enviroment variables
const port = process.env.PORT || 4000;

// Setup middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sequelize setup
db.sequelize.sync()
    .then(() => {
        console.log("Synced database!");
    })
    .catch((err) => {
        console.log("Error syncing database: ", err);
    });

// Setup API endpoints
require("./routes/auth.route")(app);
require("./routes/dataset.route")(app);

// Start the server
app.listen(port, function () {
    console.log(`Server is running on port ${port}!`);
});

// TODO: Remove console.log() statements
// TODO: Replace sqlite3