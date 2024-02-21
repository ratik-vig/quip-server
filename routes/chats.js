const express = require('express')

const router = express()

router.get('/', (req, res) => {
    console.log(req.user)
    res.send('chat routes')
})

module.exports = router 