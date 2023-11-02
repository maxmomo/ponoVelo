const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Rider = require("./Rider")
const Race = require("./Race")
const Stage = require("./Stage")
const User = require("./User")
const BetType = require("./BetType")

const Bet = sequelize.define('Bet', {
    position: {
        type: DataTypes.INTEGER,
    },
})

Rider.hasMany(Bet);
Bet.belongsTo(Rider);

Race.hasMany(Bet);
Bet.belongsTo(Race);

Stage.hasMany(Bet);
Bet.belongsTo(Stage);

User.hasMany(Bet);
Bet.belongsTo(User);

BetType.hasMany(Bet);
Bet.belongsTo(BetType);

module.exports = Bet;