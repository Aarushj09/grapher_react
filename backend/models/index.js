const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.user = require("./user.model.js")(sequelize, Sequelize);
db.user_dataset = require("./user_dataset.model.js")(sequelize, Sequelize);
db.graph = require("./graph.model.js")(sequelize, Sequelize);

module.exports = db;