module.exports = (sequelize, Sequelize) => {
    const Period = sequelize.define('period', {
        numPeriod: {
            type: Sequelize.INTEGER,
        },
        statusDelete: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
    return Period;
};
