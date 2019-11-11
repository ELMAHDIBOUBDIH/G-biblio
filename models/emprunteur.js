'use strict';
module.exports = (sequelize, DataTypes) => {
    const emprunteur = sequelize.define('emprunteur', {
        nom: DataTypes.STRING,
        prenom: DataTypes.STRING,
        cne: DataTypes.STRING,
        cin: DataTypes.STRING,
        idetablis: {
            type: DataTypes.INTEGER, allowNull: false,
            references: {
                model: 'Etablissements',
                key: 'id'
            }
        },
        idfiliere: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Filieres',
                key: 'id'
            }
        }
    }, {});
    emprunteur.associate = function (models) {
        emprunteur.hasMany(models.emprunte, {
            foreignKey: 'idEmprunteur',
            as: 'emprunte'
        });
        emprunteur.belongsTo(models.Etablissement, {foreignKey: 'idetablis', as: 'etablis'});
        emprunteur.belongsTo(models.Filiere, {foreignKey: 'idfiliere', as: 'filiere'});
    };
    return emprunteur;
};