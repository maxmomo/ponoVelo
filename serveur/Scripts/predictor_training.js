const db = require("../../config/database")


let p1 = 0.01
let p2 = 0.02
let p3 = 0.03
let p4 = 1



const getPrediction = async (req, res) => {
    params = req.query

    const riders = await db.query(
        "SELECT ri.id as rider_id, ri.nationality as rider_nationality, ri.name as rider_name, ri.firstName as rider_first_name, ri.picture as rider_picture, " +
        "AVG(res.result_rank) / (1 + COUNT(res.id) / 100) AS weighted_score " +
        "FROM riders ri " +
        "JOIN startlists st ON ri.id = st.RiderId " +
        "JOIN results res ON res.RiderId = ri.id " +
        "JOIN stages s ON s.id = res.StageId " +
        "JOIN stages ref_stage ON ref_stage.id = :stage_id " +
        "WHERE st.RaceId = :race_id AND " +
        "ABS(s.profile_score - ref_stage.profile_score) <= 0.3 * ref_stage.profile_score AND " +
        "ABS(s.distance - ref_stage.distance) <= 0.3 * ref_stage.distance AND " +
        "s.type = ref_stage.type " +
        "GROUP BY ri.id " +
        "HAVING AVG(res.result_rank) / COUNT(res.id) > 0 " +
        "ORDER BY weighted_score ASC " +
        "LIMIT 3",
        {
            type: db.SELECT,
            replacements: { 
                stage_id: params['stage_id'],
                race_id: params['race_id'],
            },
        }
    )

    res.json(riders[0])
};


module.exports = {getPrediction};