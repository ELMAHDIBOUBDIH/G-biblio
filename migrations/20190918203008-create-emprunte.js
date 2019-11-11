'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('empruntes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idLivre: {
        type: Sequelize.INTEGER,
          references: {
              model: 'Livres',
              key: 'id'
          }
      },
      idEmprunteur: {
        type: Sequelize.INTEGER,
          references: {
              model: 'emprunteurs',
              key: 'id'
          }
      },
      dateEmprunte: {
        type: Sequelize.DATE
      },
      dateRendu: {
        type: Sequelize.DATE
      },
      Rendu: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('empruntes');
  }
};