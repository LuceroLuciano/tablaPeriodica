module.exports = (sequelize, Sequelize) => {
    const Period = sequelize.define('period', {
        numPeriod: {
            type: Sequelize.STRING,
        },
        statusDelete: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
    return Period;
};
