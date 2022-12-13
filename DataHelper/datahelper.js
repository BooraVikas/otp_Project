const jwt = require('jsonwebtoken')
const PrivateKey = require('../secretKey/secret')


module.exports = class Datahelper{

    async generateToken(data) {

        let token = jwt.sign(data, PrivateKey.secret_jwt);
    
        if (!token) {
    
            return false
    
        }
    
        return token
    
    }

}
