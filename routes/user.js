const express = require('express')
const { userSignup } = require('../controllers/userController')
const { signupRequest } = require('../validators/userValidations')

const router = express()

router.post('/signup', signupRequest(), userSignup)

module.exports = router