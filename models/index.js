const { User } = require('../models/User')
const { Chat } = require('../models/Chat')
const sequelize = require('sequelize')
const { db } = require('../config/db.config')

Chat.belongsTo(User, {
    foreignKey: 'chat_user1',
    as: 'user1'
});

Chat.belongsTo(User, {
    foreignKey: 'chat_user2',
    as: 'user2'
});

User.hasMany(Chat, {
    foreignKey: 'chat_user1',
    as: 'fk_chat_user1' 
});

User.hasMany(Chat, {
    foreignKey: 'chat_user2',
    as: 'fk_chat_user2'
}); 

// db.sync({force: true})

module.exports = { User, Chat }