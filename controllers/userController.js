const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bycrypt = require('bcryptjs')
const { User } = require('../models/User')

const salt = bycrypt.genSaltSync(10)

const userSignup = async(req, res, next) => {
    const valResult = validationResult(req).array({ onlyFirstError: true });
    try{
        if (!valResult.length == 0) {
            let err = new Error()
            err.statusCode = 400
            err.errors = valResult
            throw err
        }
        const {fname, lname, email, password} = req.body
        const user = await User.findOne({ where: {user_email: email} })
        if(user){
            let err = new Error()
            err.statusCode = 409,
            err.errors = [{msg: "User already exists"}]
            throw err
        }

        const hashedPassword = bycrypt.hashSync(password, salt)
        const addedUser = await User.build({user_fname: fname, user_lname: lname, user_email: email, user_pwd: hashedPassword})
        await addedUser.save()
        res.status(201).send(addedUser)

    }catch(err){
        next(err)
    }
}

const userLogin = async (req, res, next) => {
    const valResult = validationResult(req).array({ onlyFirstError: true });
    try {
      if (!valResult.length == 0) {
        let err = new Error()
        err.statusCode = 400,
        err.errors = valResult
        throw err
      }
  
      const { email, password } = req.body;
      const user = await User.findOne({ where: {user_email: email} });
      console.log(user.dataValues)
      if (!user) {
        let err = new Error()
        err.statusCode = 404,
        err.errors = [{msg: "User does not exits"}]
        throw err
      }

      if (bycrypt.compareSync(password, user.dataValues.user_pwd)) {
        const token = await jwt.sign({ data: user.dataValues }, process.env.JWT_SECRET)
        res.send({ userId: user.dataValues.user_id, name: user.dataValues.user_fname + " " + user.dataValues.user_lname, email: user.dataValues.user_email, token })
      } else{
        let err = new Error()
        err.statusCode = 401,
        err.errors = [{msg: "Invalid credentials"}]
        throw err
      }
    } catch (err) {
      console.log(err.message)
      next(err);
    }
  };

module.exports = { userSignup, userLogin }