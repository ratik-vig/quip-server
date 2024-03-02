const { DataTypes } = require('sequelize');
const { db } = require('../config/db.config')
const { User } = require('../models/User')

const Chat = db.define('Chat', {
    chat_id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    chat_user1: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chat_user2: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'chats' 
}); 


module.exports = { Chat } 