'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Restos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            ville: {
                allowNull: false,
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            codePostal: {
                type: Sequelize.STRING
            },
            latitude: {
                allowNull: false,
                type: Sequelize.STRING
            },
            longitude: {
                allowNull: false,
                type: Sequelize.STRING
            },
            img1: {
                type: Sequelize.STRING
            },
            img2: {
                type: Sequelize.STRING
            },
            img3: {
                type: Sequelize.STRING
            },
            img4: {
                type: Sequelize.STRING
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
        return queryInterface.dropTable('Restos');
    }
};