'use strict';
module.exports = (sequelize, DataTypes) => {
    const Filiere = sequelize.define('Filiere', {
        name: DataTypes.STRING,
        idetablis: {
            type :DataTypes.INTEGER,
            allowNull: false,
            references: {
            model: 'Etablissements',
            key: 'id'
           }
    }
},
    {
    }
)
    ;
    Filiere.associate = function (models) {
        Filiere.hasMany(models.emprunteur, {
            foreignKey: 'idfiliere',
            as: 'emprunteur'
        });
    };
    return Filiere;
};