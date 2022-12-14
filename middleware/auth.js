const jwt = require('jsonwebtoken')
const privateKey = require('../secretKey/secret')

const TokenVerification = async (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers['authorization'];

    if (!token) {
        res.status(400).json({ success: false, msg: "a token is required for authentication" })
    }

    try {
        const decode = jwt.verify(token, privateKey.secret_jwt);
        
        req.user = decode

    } catch (error) {
        console.log(error)
    }

    return next();
}

module.exports = TokenVerification;