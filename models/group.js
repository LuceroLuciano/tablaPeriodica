module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define('group', {
        numGroup: {
            type: Sequelize.STRING,
        },
        statusDelete: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
    return Group;
};