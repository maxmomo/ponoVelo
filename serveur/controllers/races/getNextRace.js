const db = require("../../config/database")

const getNextRace = async (req, res) => {

    const next_race = await db.query(
        "SELECT r.id AS race_id, r.name AS race_name, r.nationality, r.category, r.season, r.start_date AS race_start_date, r.end_date AS race_end_date, s.id AS stage_id, s.name AS stage_name, s.date AS stage_date " +
        "FROM stages s " +
        "JOIN races r ON s.race_id = r.id " +
        "WHERE s.date > CURRENT_DATE " +
        "ORDER BY s.date " + 
        "LIMIT 1;",
        {
            type: db.SELECT,
        }
    )

    // const next_race = await db.query(
    //     "SELECT r.id AS race_id, r.name AS race_name, r.nationality, r.category, r.season, r.start_date AS race_start_date, r.end_date AS race_end_date, s.id AS stage_id, s.name AS stage_name, s.date AS stage_date " +
    //     "FROM stages s " +
    //     "JOIN races r ON s.race_id = r.id " +
    //     "WHERE s.id = 578 " +
    //     "LIMIT 1;",
    //     {
    //         type: db.SELECT,
    //     }
    // )

    res.json(next_race[0])
};


module.exports = {getNextRace};