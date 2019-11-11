'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commande = sequelize.define('Commande', {
    id_user: DataTypes.INTEGER,
    id_resto: DataTypes.INTEGER,
    id_plat: DataTypes.INTEGER,
    prix_total: DataTypes.FLOAT
  }, {});
  Commande.associate = function(models) {
    // associations can be defined here
  };
  return Commande;
};