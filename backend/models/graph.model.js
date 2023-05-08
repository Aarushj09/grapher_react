module.exports = (sequelize, Sequelize) => {
    const Graph = sequelize.define("graphs", {
        user_email: {
            type: Sequelize.STRING
        },
        dataset_name: {
            type: Sequelize.STRING
        },
        x_axis: {
            type: Sequelize.STRING
        },
        y_axis: {
            type: Sequelize.STRING
        },
        graph_type: {
            type: Sequelize.STRING
        }
    });
    
    return Graph;
}