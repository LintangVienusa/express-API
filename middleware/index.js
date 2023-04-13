const jwt  = require("jsonwebtoken")
const { getToken } = require("../utils")
const config = require("../app/config")
const User = require("../app/user/model")

const decodeToken = () => {
    return async (req, res, next) => {
        try {
            let token = getToken(req)

            if (!token) return next()

            req.user = jwt.verify(token, config.secretKey)

            let user = await User.findOne({token: {$in: [token]}})

            if(!user) {
                res.json({
                    error: 1,
                    message: 'Token expired!'
                })
            }
        } catch (error) {
            if(error && error.name === 'JsonWebTokenError') {
                return res.json({
                    error: 1,
                    message: error.message
                });
            }
            next(error)
        }
        return next()
    }
}

module.exports = {
    decodeToken
}