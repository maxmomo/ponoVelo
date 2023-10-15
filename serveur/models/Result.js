const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Rider = require("./Rider")
const Stage = require("./Stage")
const Race = require("./Race")

const Result = sequelize.define('Result', {
    result_type: {
        type: DataTypes.STRING
    },
    points: {
        type: DataTypes.INTEGER,
    },
    result_rank: {
        type: DataTypes.INTEGER,
    },
})

Rider.hasMany(Result);
Result.belongsTo(Rider);

Stage.hasMany(Result);
Result.belongsTo(Stage);

Race.hasMany(Result);
Result.belongsTo(Race);

module.exports = Result;