const { body } = require("express-validator");

const getUsersRequest = () => {
  return [
    body("email").notEmpty().withMessage("email is required")
  ];
};


module.exports = { getUsersRequest }