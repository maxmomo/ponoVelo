const db = require("../../config/database")
const Bet = require("../../models/Bet")

const getBetsUserRace = async (req, res) => {
    params = req.query


    // bet = Bet.create({
    //     position: 2,
    //     RiderId: 42,
    //     RaceId: 296,
    //     UserId: 1,
    //     BetTypeId: 2,
    //     LeagueId: 23
    // })

    //     bet = Bet.create({
    //     position: 2,
    //     RiderId: 741,
    //     RaceId: 296,
    //     UserId: 1,
    //     BetTypeId: 2,
    //     LeagueId: 23
    // })

    //     bet = Bet.create({
    //     position: 2,
    //     RiderId: 512,
    //     RaceId: 296,
    //     UserId: 1,
    //     BetTypeId: 3,
    //     LeagueId: 23
    // })


    // console.log('AAAAAAAAAAAAAAAAAAAAAAAA')
    // console.log(bet)

    const bets = await db.query(
        "SELECT b.id, b.BetTypeId as type_id , b.position as position, ri.id as rider_id, ri.name as name, ri.firstName as firstName, ri.fullName as fullName, ri.nationality as nationality, ri.picture as picture " +
        "FROM bets b " +
        "JOIN riders ri ON ri.id = b.RiderId " +
        "WHERE " +
        "b.RaceId = :race_id AND " +
        "b.UserId = :user_id AND " +
        "b.LeagueId = :league_id",
        {
            type: db.SELECT,
            replacements: { 
                race_id: params['race_id'],
                user_id: params['user_id'],
                league_id: params['league_id']
            },
        }
    )

    res.json(bets[0])
};


module.exports = {getBetsUserRace};