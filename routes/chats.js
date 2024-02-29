const express = require('express')

const { createOrGet, getChatByUser } = require('../controllers/chatController')
const { createChatRequest } = require('../validators/chatValidations')

const router = express()

router.post('/create', createChatRequest() ,createOrGet)
router.get('/getChatsByUser', getChatByUser)

module.exports = router 