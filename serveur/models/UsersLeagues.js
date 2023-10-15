const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const User = require("./User")
const League = require("./League")

const UsersLeagues = sequelize.define('UsersLeagues', {
    total: {
        type: DataTypes.INTEGER,
        defaultValue: 200
    }
})

const update_total = async (userLeague) => {
    const totalUsers = await UsersLeagues.count({
        where: {
            LeagueId: userLeague.LeagueId
        }
    });

    await League.update({ 
        nb_users: totalUsers 
    }, {
        where: {
            id: userLeague.LeagueId
        }
    });
}

UsersLeagues.afterCreate(async (userLeague, options) => {
    update_total(userLeague);
});

UsersLeagues.afterUpdate(async (userLeague, options) => {
    update_total(userLeague);
});

UsersLeagues.afterDestroy(async (userLeague, options) => {
    update_total(userLeague);
});

User.belongsToMany(League, { through: UsersLeagues });
League.belongsToMany(User, { through: UsersLeagues });

module.exports = UsersLeagues;