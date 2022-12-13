const Sequelize = require("sequelize");
const sequelize = require('../database/db')
const Student = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type :Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
   otp : {
    type : Sequelize.INTEGER
   }
  
});


module.exports = Student;