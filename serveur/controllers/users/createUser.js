const User = require("../../models/User")
const { Op } = require("sequelize");

const createUser = async (req, res) => {
    params = req.query
    result = ""

    users = await User.findAll({
        where: {
            [Op.or]: [
                { email: params['email'] },
                { userName: params['userName'] }
            ]
          }
    })

    if (users.length == 0) {
        const user = await User.create({
            email: params['email'],
            userName: params['userName'],
            password: params['password']
        })
        
        result = "User created with id " + users.id
    } else {
        result = "User already exists"
    }
    
    res.json(result)

};


module.exports = {createUser};
