const User = require('../models/student')
const auth = require('../middleware/auth')

const express = require('express')
const user_Router = express()

require('../database/db')

const userCntrl = require('../controller/UserController')

user_Router.post('/login',userCntrl.login_method)

user_Router.get('/finduser',auth,userCntrl.getProfile)

user_Router.get('/verify',userCntrl.verifyOTP)

user_Router.get('/test',auth,(req,res)=>{
    res.status(200).send({success:true, msg : 'authenticated'})
  })

user_Router.patch('/updateuser',auth,userCntrl.updateProfile)

module.exports = user_Router;