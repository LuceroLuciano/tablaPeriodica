module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define('group', {
        numGroup: {
            type: Sequelize.INTEGER,
        },
        statusDelete: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
    return Group;
};