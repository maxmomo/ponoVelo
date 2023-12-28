const Rider = require("../../models/Rider")

const getRiders = async (req, res) => {
    params = req.query

    const riders = await Rider.findAll({
        where: {
            id: 1
        }
    })

    res.json(riders)
};


module.exports = {getRiders};