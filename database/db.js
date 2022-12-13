const {Sequelize} = require('sequelize')

const sequelize = new Sequelize("otp_Project", "root", "Technologies@123",{
    host : 'localhost',
    dialect : 'mysql',
    logging : false  /*(by using this command, the terminal will not show
        unneccessary queries like drop table , create table)*/
});

try {
    sequelize.authenticate();
    console.log('connection established successfully');
} catch (error) {
    console.log(error)
}
 
module.exports = sequelize;