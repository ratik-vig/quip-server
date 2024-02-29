const { body } = require("express-validator");

const createChatRequest = () => {
  return [
    body("user").notEmpty().withMessage("recipient is required")
  ];
};


module.exports = { createChatRequest }