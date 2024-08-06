const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Customer=sequelize.define('customer',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    phonenumber:{
        type:Sequelize.NUMBER,
        unique:true,
        allowNull:false
    }
});
module.exports=Customer;