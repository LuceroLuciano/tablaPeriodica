//model element
module.exports = (sequelize, Sequelize) => {
    const Elemen = sequelize.define('element', {
        name: {
            type: Sequelize.STRING,
        },
        atomicNumber: {
            type: Sequelize.INTEGER,
        },
        symbol: {
            type: Sequelize.STRING,
        },
        atomicMass: {
            type: Sequelize.DECIMAL,
        },
        statusDelete: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });   
    return Elemen;     
};

