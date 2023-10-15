const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Rider = require("./Rider")
const User = require('./User')
const UsersLeagues = require('./UsersLeagues')

const UserRidersOffer = sequelize.define('UserRidersOffer', {
    offer: {
        type: DataTypes.FLOAT
    },
    LeagueId: {
        type: DataTypes.INTEGER
    }
})

const update_total = async (userRiderOffer) => {
    console.log('************************************')
    const totalOfferAmount = await UserRidersOffer.sum('offer', {
        where: {
            UserId: userRiderOffer.UserId,
            LeagueId: userRiderOffer.LeagueId
        }
    });
    console.log(totalOfferAmount)
    await UsersLeagues.update({ 
        total: 200 - totalOfferAmount 
    }, {
        where: {
            UserId: userRiderOffer.UserId,
            LeagueId: userRiderOffer.LeagueId
        }
    });
}

UserRidersOffer.afterCreate(async (userRiderOffer, options) => {
    update_total(userRiderOffer);
});

UserRidersOffer.afterUpdate(async (userRiderOffer, options) => {
    update_total(userRiderOffer);
});

UserRidersOffer.afterDestroy(async (userRiderOffer, options) => {
    update_total(userRiderOffer);
});

Rider.belongsToMany(User, { through: UserRidersOffer });
User.belongsToMany(Rider, { through: UserRidersOffer });

module.exports = UserRidersOffer;