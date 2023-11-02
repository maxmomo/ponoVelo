const db = require("../../config/database")

const getUsersLeague = async (req, res) => {
    params = req.query

    const users = await db.query(
        "SELECT u.*, ul.total " +
        "FROM usersleagues ul " +
        "JOIN users u ON u.id = ul.UserId " +
        "WHERE " + 
        "ul.LeagueId = :league_id AND " + 
        "u.id != :user_id",
        {
            type: db.SELECT,
            replacements: { 
                league_id: params['league_id'],
                user_id: params['user_id']
            },
        }
    )

    res.json(users[0])
};


module.exports = {getUsersLeague};