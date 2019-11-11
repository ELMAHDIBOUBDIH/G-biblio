'use strict';
module.exports = (sequelize, DataTypes) => {
    const Resto = sequelize.define('Resto', {
        name: DataTypes.STRING,
        ville: DataTypes.STRING,
        address: DataTypes.STRING,
        codePostal: DataTypes.STRING,
        latitude: DataTypes.STRING,
        longitude: DataTypes.STRING,
        img1: DataTypes.STRING,
        img2: DataTypes.STRING,
        img3: DataTypes.STRING,
        img4: DataTypes.STRING
    }, {});
    Resto.associate = function (models) {
        // associations can be defined here
    };
    return Resto;
};