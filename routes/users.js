const express = require('express')
const { getUsers } = require('../controllers/userController')
const { getUsersRequest } = require('../validators/userValidations')


const router = express()

router.get('/getUsers', getUsers)

module.exports = router