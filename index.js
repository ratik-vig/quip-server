const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')

dotenv.config()

const app = express()

app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => res.send('home route'))

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

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))

