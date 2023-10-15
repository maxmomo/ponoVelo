const db = require("../../config/database")

const getUserRidersOfferMercato = async (req, res) => {
    params = req.query

    const offers = await db.query(
        "SELECT ri.picture as picture, ri.odr_points, ri.gc_points, ri.tt_points, ri.sprint_points, ri.climb_points, ri.name as rider_name, ri.id as rider_id, ri.nationality as nationality, t.abbreviation as team_abbreviation, t.id as team_id, t.status as team_status, t.name as team_name, uro.offer as offer, " +
        "ri.season_points + 1 as cost " +
        "FROM riders ri " +
        "LEFT JOIN userridersoffers uro ON uro.RiderId = ri.id AND uro.UserId = :user_id AND uro.LeagueId = :league_id " +
        "JOIN teams t ON ri.team_id = t.id " +
        "WHERE t.status in ('WT', 'PRT') AND " +
        "uro.RiderId IS NULL " +
        "ORDER BY ri.season_points DESC",
        {
            type: db.SELECT,
            replacements: { 
                user_id: params['user_id'],
                league_id: params['league_id'],
            },
        }
    )

    res.json(offers[0])
};


module.exports = {getUserRidersOfferMercato};