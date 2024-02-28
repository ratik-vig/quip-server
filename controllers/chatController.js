const { validationResult } = require('express-validator')
const { Op } = require('sequelize')

const { Chat } = require('../models/Chat')

const createOrGet = async(req, res, next) => {
    const valResult = validationResult(req).array({ onlyFirstError: true });
    try{
        if (!valResult.length == 0) {
            let err = new Error()
            err.statusCode = 400
            err.errors = valResult
            throw err
        }
        const { user1, user2} = req.body

        const checkIfChatExists = await Chat.findOne({ 
            where: {
                [Op.or]: [
                    { chat_user1: user1, chat_user2: user2 },
                    { chat_user1: user2, chat_user2: user1 }
                ]
            }
        })

        if(checkIfChatExists) {
            res.send(checkIfChatExists)
            return;
        }

        const newChat = await Chat.build({ chat_user1: user1, chat_user2: user2 })
        await newChat.save()
        res.send(newChat)

    }catch(err){
        next(err)
    }
}

const getChatByUser = async(req, res, next) => {
    const valResult = validationResult(req).array({ onlyFirstError: true });
    try{
        if (!valResult.length == 0) {
            let err = new Error()
            err.statusCode = 400
            err.errors = valResult
            throw err
        }

        const { id }  = req.params
        const chats = await Chat.findAll({ where: {
            [Op.or]: [{ chat_user1: id}, {chat_user2: id}]
        }})
        res.send(chats)
    }catch(err){
        next(err)
    }
}

module.exports = { createOrGet, getChatByUser }