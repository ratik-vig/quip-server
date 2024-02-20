const { Sequelize } = require('sequelize')

const db = new Sequelize({
    host: 'localhost',
    dialect: 'mysql',
    username: 'root',
    password: 'secret11',
    database: 'quip'
})

module.exports = { db }