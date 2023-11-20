const Rider = require("../../models/Rider")
const RidersTeams = require("../../models/RidersTeams")
const Race = require("../../models/Race")
const Stage = require("../../models/Stage")
const StartList = require("../../models/StartList")
const Result = require("../../models/Result")
const League = require("../../models/League")
const UsersLeagues = require("../../models/UsersLeagues")
const UserRidersOffer = require("../../models/UserRidersOffer")
const BetType = require("../../models/BetType")
const Bet = require("../../models/Bet")
const UserRiders = require("../../models/UserRiders")

const db = require("../../config/database")

const getRidersTeam = async (req, res) => {
    params = req.query

    const riders = await db.query(
        "SELECT ri.* " +
        "FROM ridersteams rt " +
        "JOIN riders ri ON ri.id = rt.RiderId " +
        "WHERE " + 
        "rt.TeamId = :team_id " +
        "ORDER BY ri.odr_points + ri.gc_points + ri.tt_points + ri.sprint_points + ri.climb_points DESC",
        {
            type: db.SELECT,
            replacements: { 
                team_id: params['team_id'],
            },
        }
    )

    res.json(riders[0])
};


module.exports = {getRidersTeam};