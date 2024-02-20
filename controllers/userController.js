const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const userSignup = async(req, res, next) => {
    const valResult = validationResult(req).array({ onlyFirstError: true });

    try{
        if (!valResult.length == 0) {
            let err = new Error()
            err.statusCode = 400
            err.errors = valResult
            throw err
        }
        res.send('signup route')
    }catch(err){
        next(err)
    }
}

module.exports = { userSignup }