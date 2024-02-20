const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')

const userRoutes = require('./routes/user')
const errorHandler = require('./middlewares/errorHandler')
const { db } = require('./config/db.config')
const { User } = require('./models/User')

dotenv.config()

const app = express()


app.use(cors())
app.use(morgan('dev'))


const connect = async() => {
    try{
        await db.authenticate()
        console.log('connected')
    }catch(err){
        console.log('error connection to database')
    }
}
connect()

app.get('/', async(req, res) => {
    const user = User.build({user_fname: "ratik", user_lname: "vig", user_email: "ratikvig@gmail.com", user_pwd: "secret11"})
    await user.save()
    res.send('home route')
})

app.use(express.json({
    verify: (req, res, buf, encoding) => {
        try{
            JSON.parse()
        }catch(err){
            res.statusCode(400).json({error: "Invalid request"})
        }
    }
}))

const PORT = process.env.PORT || 5002

app.use('/api/v1/users', userRoutes)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))

