'use strict';
module.exports = (sequelize, DataTypes) => {
    const Plat = sequelize.define('Plat', {
        name: DataTypes.STRING,
        id_resto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Restos',
                key: 'id'
            },
        },
        description: DataTypes.STRING,
        img1: DataTypes.STRING,
        img2: DataTypes.STRING,
        img3: DataTypes.STRING,
        prix: DataTypes.FLOAT
    }, {});
    Plat.associate = function (models) {
        // associations can be defined here
    };
    return Plat;
};