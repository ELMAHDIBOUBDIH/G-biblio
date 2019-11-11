'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dt_Commandes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_cmd: {
        type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'Commandes',
              key: 'id'
          },
      },
      id_plat: {
        type: Sequelize.INTEGER
      },
      prix: {
        type: Sequelize.FLOAT
      },
      qnt: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('dt_Commandes');
  }
};