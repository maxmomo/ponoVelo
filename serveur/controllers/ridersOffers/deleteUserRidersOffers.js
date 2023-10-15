const UserRidersOffer = require("../../models/UserRidersOffer")

const deleteUserRidersOffers = async (req, res) => {
    params = req.query
    console.log(params)

    await UserRidersOffer.destroy({
        where: {
            RiderId: params['rider_id'],
            LeagueId: params['league_id'],
            UserId: params['user_id'],
        }
    });

    res.json(true)
};


module.exports = {deleteUserRidersOffers};