const express = require('express')
const app = express()

require('./database/db')

app.use(express.json());
require("./config/config.json")
require('./models/student')


User_route = require('./Router/userRoutes')
app.use(User_route)

app.listen(8000,()=>{
    console.log('server listening at 8000')
})