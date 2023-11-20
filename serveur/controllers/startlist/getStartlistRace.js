const db = require("../../config/database")

const getStartListRace = async (req, res) => {
    params = req.query
    
    const startlist = await db.query(
        "SELECT ri.id as rider_id, ri.nationality as rider_nationality, ri.fullName as rider_name, t.id as team_id, t.name as team_name, t.nationality as team_nationality " +
        "FROM startlists st " +
        "JOIN riders ri ON ri.id = st.RiderId " +
        "JOIN teams t ON t.id = ri.team_id " +
        "WHERE " + 
        "st.RaceId = :race_id " +
        "ORDER BY t.id, ri.season_points DESC",
        {
            type: db.SELECT,
            replacements: { 
                race_id: params['race_id'],
            },
        }
    )

    res.json(startlist[0])
};


module.exports = {getStartListRace};