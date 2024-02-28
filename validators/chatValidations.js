const { body } = require("express-validator");

const createChatRequest = () => {
  return [
    body("user1").notEmpty().withMessage("user1 is required"),
    body("user2").notEmpty().withMessage("user2 is required")
  ];
};


module.exports = { createChatRequest }