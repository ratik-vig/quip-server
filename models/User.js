const { DataTypes, Model } = require('sequelize');
const { db } = require('../config/db.config');
const { Chat } = require('../models/Chat')

const User = db.define('User', {
    user_id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_fname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_lname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_pwd: {
        type: DataTypes.STRING,
        allowNull: false 
    }
}, {
    tableName: 'users' 
}); 

module.exports = { User }