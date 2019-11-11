'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Plats', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            id_resto: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Restos',
                    key: 'id'
                },
            },
            description: {
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
            prix: {
                type: Sequelize.FLOAT
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
        return queryInterface.dropTable('Plats');
    }
};