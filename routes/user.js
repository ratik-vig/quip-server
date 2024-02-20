const express = require('express')
const { userSignup, userLogin } = require('../controllers/userController')
const { signupRequest, loginRequest } = require('../validators/userValidations')

const router = express()

router.post('/signup', signupRequest(), userSignup)
router.post('/login', loginRequest(), userLogin)

module.exports = router