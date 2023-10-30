const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Rider = require("./Rider")
const User = require('./User')
const UsersLeagues = require('./UsersLeagues')

const UserRidersOffer = sequelize.define('UserRidersOffer', 
    {
        offer: {
            type: DataTypes.FLOAT
        },
        LeagueId: {
            type: DataTypes.INTEGER
        }
    }, 
    {
        hooks: {
            afterCreate: async (userRiderOffer, options) => {
                console.log("After create triggered");
                update_total(userRiderOffer);
            },
            afterUpdate: async (userRiderOffer, options) => {
                console.log("After update triggered");
                update_total(userRiderOffer);
            },
            afterDestroy: async (userRiderOffer, options) => {
                console.log("Before destroy triggered");
                update_total(userRiderOffer);
            }
        }
    }
);

const update_total = async (userRiderOffer) => {
    const totalOfferAmount = await UserRidersOffer.sum('offer', {
        where: {
            UserId: userRiderOffer.UserId,
            LeagueId: userRiderOffer.LeagueId
        }
    });

    await UsersLeagues.update({ 
        total: 200 - totalOfferAmount 
    }, {
        where: {
            UserId: userRiderOffer.UserId,
            LeagueId: userRiderOffer.LeagueId
        }
    });
}

Rider.belongsToMany(User, { through: UserRidersOffer });
User.belongsToMany(Rider, { through: UserRidersOffer });

module.exports = UserRidersOffer;