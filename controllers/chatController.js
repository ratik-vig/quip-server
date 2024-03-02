const { validationResult } = require('express-validator')
const { Op } = require('sequelize')

const { Chat } = require('../models')
const { User } = require('../models')

const createOrGet = async(req, res, next) => {
    const valResult = validationResult(req).array({ onlyFirstError: true });
    try{
        if (!valResult.length == 0) {
            let err = new Error()
            err.statusCode = 400
            err.errors = valResult
            throw err
        }
        const { id } = req.user
        const { user } = req.body

        const checkIfChatExists = await Chat.findOne({ 
            where: {
                [Op.or]: [
                    { chat_user1: id, chat_user2: user },
                    { chat_user1: user, chat_user2: id }
                ]
            }
        })

        if(checkIfChatExists) {
            res.send(checkIfChatExists)
            return;
        }

        const newChat = await Chat.build({ chat_user1: id, chat_user2: user })
        await newChat.save()
        res.status(201).send(newChat)

    }catch(err){
        console.log(err)
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

        const { id }  = req.user

        const chats = await Chat.findAll({ where: {
            [Op.or]: [{ chat_user1: id}, {chat_user2: id}]
        }, include:[
            {
                model: User, 
                as:'user2',
                attributes: {exclude: ["user_pwd", "createdAt", "updatedAt"]}
            },{
                model: User, 
                as: 'user1',
                attributes: {exclude: ["user_pwd", "createdAt", "updatedAt"]}
            }], attributes: {exclude: ["chat_user1", "chat_user2"]}})
        res.status(200).send(chats)
    }catch(err){
        next(err)
    }
}

module.exports = { createOrGet, getChatByUser }