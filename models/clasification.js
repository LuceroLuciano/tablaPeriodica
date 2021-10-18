module.exports = (sequelize, Sequelize) => {
    const Clasification = sequelize.define('clasification', {
        nameClasification: {
            type: Sequelize.STRING,
        }, 
        statusDelete: {
            type:Sequelize.BOOLEAN,
                defaultValue: false,
        },
    });
    return Clasification;
};