const jwt = require('jsonwebtoken')
const { User } = require("../models/User");

const auth = async(req, res, next) => {
    let token
    try{
        if(req.headers.authtoken && req.headers.authtoken.startsWith('Bearer')){
            token = req.headers.authtoken.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const { user_id, user_fname, user_lname, user_email } = decoded.data
            req.user = {
                id: user_id,
                fname: user_fname,
                lname: user_lname,
                email: user_email
            }
            next()
        }
    
        if(!token){
            let err = new Error()
            err.statusCode = 401
            err.errors = [{msg: "No token provided"}]
            throw err
        }
    }catch(err){
        next(err)
    }
    
}

module.exports = auth 