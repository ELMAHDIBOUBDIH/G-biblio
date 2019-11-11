'use strict';
module.exports = (sequelize, DataTypes) => {
  const Etablissement = sequelize.define('Etablissement', {
    name: DataTypes.STRING
  }, {});
  Etablissement.associate = function(models) {
      Etablissement.hasMany(models.emprunteur, {
          foreignKey: 'idetablis',
          as: 'emprunteur'
      });
  };
  return Etablissement;
};