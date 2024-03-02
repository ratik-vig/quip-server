const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')

const authRoutes = require('./routes/auth')
const chatRoutes = require('./routes/chats')
const userRoutes = require('./routes/users')

const errorHandler = require('./middlewares/errorHandler')
const auth  = require('./middlewares/auth')

const { db } = require('./config/db.config')

// const { Chat } = require('./models/Chat')
const { User } = require('./models')

dotenv.config()
 
const app = express()

 
app.use(cors())
app.use(morgan('dev'))

app.use(express.json({
    verify: (req, res, buf, encoding) => {
        try{
            JSON.parse(buf)
        }catch(err){
            let error = new Error
            error.statusCode = 403
            error.errors = [{msg: "Invalid request - JSON cannot be parsed"}]
            throw error
        }
    }
}))

const PORT = process.env.PORT || 5002

app.use('/api/v1/auth', authRoutes)

app.use(auth)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/chats', chatRoutes)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))

