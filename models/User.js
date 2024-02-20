const { DataTypes } = require('sequelize');
const { db } = require('../config/db.config')

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
        type: DataTypes.STRING(64),
        validate: {
            is: /^[0-9a-f]{64}$/i
        }, 
        allowNull: false
    }
}, {
    tableName: 'users' 
});

(async () => {
    await db.sync({ force: true });
    // Code here
  })();

module.exports = { User }