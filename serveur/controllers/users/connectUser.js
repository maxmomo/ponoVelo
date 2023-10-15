const User = require("../../models/User")

const connectUser = async (req, res) => {
    params = req.query
    result = ""

    user = await User.findAll({
        where: {
            email: params['email'],
            password: params['password'] 
        }
    })

    if (user.length == 0) {
        result = false
    } else {
        result = user[0]
    }
    
    res.json(result)

};

module.exports = {connectUser};
