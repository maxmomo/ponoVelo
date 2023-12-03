const db = require("../../config/database")

const getUserRidersLeague = async (req, res) => {
    params = req.query

    const riders = await db.query(
        "SELECT ri.name as rider_name, ri.firstname as rider_firstname, ri.id as rider_id, ri.picture as rider_picture " +
        "FROM riders ri " +
        "JOIN userriders ur ON ur.RiderId = ri.id " +
        "WHERE ur.UserId = :user_id AND " +
        "ur.LeagueId = :league_id " + 
        "ORDER BY ri.season_points DESC",
        {
            type: db.SELECT,
            replacements: { 
                user_id: params['user_id'],
                league_id: params['league_id'],
            },
        }
    )

    res.json(riders[0])
};


module.exports = {getUserRidersLeague};