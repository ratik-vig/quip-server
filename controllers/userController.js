const { validationResult } = require('express-validator')
const { Op } = require('sequelize')

const { User } = require('../models/User')

const getUsers = async(req, res, next) => {
    const valResult = validationResult(req).array({ onlyFirstError: true });
    try{
        if(valResult.length !== 0){
            let err = new Error()
            err.statusCode = 400
            err.errors = valResult
            throw err
        }

        const { email } = req.body

        const users = await User.findAll({
            where: {
                user_email: {
                    [Op.like]: `${email}%`
                }
            }
        })

        res.send(users)

    }catch(err){
        console.log(err)
        next(err)
    }
}

module.exports = { getUsers }