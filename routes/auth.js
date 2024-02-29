const express = require('express')
const { userSignup, userLogin } = require('../controllers/authController')
const { signupRequest, loginRequest } = require('../validators/authValidations')

const router = express()

router.post('/signup', signupRequest(), userSignup)
router.post('/login', loginRequest(), userLogin)

module.exports = router