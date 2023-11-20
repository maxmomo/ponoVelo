const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Rider = require("./Rider")
const User = require('./User')
const League = require('./League')

const UserRiders = sequelize.define('UserRiders', 
    {
        LeagueId: {
            type: DataTypes.INTEGER
        }
    }, 
);

Rider.belongsToMany(User, { through: UserRiders });
User.belongsToMany(Rider, { through: UserRiders });

UserRiders.hasMany(League);
League.belongsTo(UserRiders);

module.exports = UserRiders;