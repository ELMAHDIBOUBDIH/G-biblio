'use strict';
module.exports = (sequelize, DataTypes) => {
    const emprunte = sequelize.define('emprunte', {
        idLivre: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Livres',
                key: 'id'
            }
        },
        idEmprunteur: {
            type: DataTypes.INTEGER,
            references: {
                model: 'emprunteurs',
                key: 'id'
            }
        },
        dateEmprunte: DataTypes.DATE,
        dateRendu: DataTypes.DATE,
        Rendu: DataTypes.BOOLEAN
    }, {});
    emprunte.associate = function (models) {
        emprunte.belongsTo(models.emprunteur, {foreignKey: 'idEmprunteur', as: 'Emprunteur'});
        emprunte.belongsTo(models.Livre, {foreignKey: 'idLivre', as: 'Livre'});
    };
    return emprunte;
};