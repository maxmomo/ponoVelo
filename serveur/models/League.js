const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const League = sequelize.define('League', {
    name: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    nb_users: {
        type: DataTypes.INTEGER,
    },
    mercato_endDate: {
        type: DataTypes.DATE,
        defaultValue: "2024-01-15"
    }
});

module.exports = League;