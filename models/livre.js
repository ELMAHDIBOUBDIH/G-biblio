'use strict';
module.exports = (sequelize, DataTypes) => {
    const Livre = sequelize.define('Livre', {
        name: DataTypes.STRING,
        qnt: DataTypes.INTEGER,
        ref: DataTypes.STRING,
        id_categorie: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Categories',
                key: 'id'
            },
        },
    }, {});
    Livre.associate = function (models) {
        // associations can be defined here
    };
    return Livre;
};