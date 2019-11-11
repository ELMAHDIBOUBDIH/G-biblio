'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('emprunteurs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      prenom: {
        type: Sequelize.STRING
      },
      cne: {
        type: Sequelize.STRING
      },
      cin: {
        type: Sequelize.STRING
      },
      idetablis: {
        type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'Etablissements',
              key: 'id'
          }
      },
      idfiliere: {
        type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'Filieres',
              key: 'id'
          },

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
    return queryInterface.dropTable('emprunteurs');
  }
};