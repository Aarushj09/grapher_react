module.exports = (sequelize, Sequelize) => {
    const User_Dataset = sequelize.define("user_datasets", {
        user_email: {
            type: Sequelize.STRING
        },
        dataset_name: {
            type: Sequelize.STRING
        }
    });
    
    return User_Dataset;
}