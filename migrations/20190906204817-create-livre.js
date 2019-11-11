'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Livres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
        qnt: {
        type: Sequelize.INTEGER
      },
        ref: {
            type: Sequelize.STRING
        },
        id_categorie: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Categories',
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
    return queryInterface.dropTable('Livres');
  }
};