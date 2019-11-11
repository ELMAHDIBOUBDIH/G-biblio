'use strict';
module.exports = (sequelize, DataTypes) => {
  const dt_Commande = sequelize.define('dt_Commande', {
    id_cmd: DataTypes.INTEGER,
    id_plat: DataTypes.INTEGER,
    prix: DataTypes.FLOAT,
    qnt: DataTypes.INTEGER
  }, {});
  dt_Commande.associate = function(models) {
    // associations can be defined here
  };
  return dt_Commande;
};