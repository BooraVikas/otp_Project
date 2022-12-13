const User = require('../models/student')

const express = require('express')
const user_Router = express()

require('../database/db')

const userCntrl = require('../controller/UserController')

user_Router.post('/login',userCntrl.login_method)

user_Router.get('/finduser/:id',userCntrl.getProfile)

user_Router.get('/verify',userCntrl.verifyOTP)

user_Router.patch('/updateuser',userCntrl.updateProfile)

module.exports = user_Router;