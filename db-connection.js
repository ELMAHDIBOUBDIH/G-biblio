const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
var sequelize = new Sequelize('dbtest', 'root', null,
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        charset: 'utf8'
    });
module.exports = sequelize;

