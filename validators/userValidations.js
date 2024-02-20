const { body } = require("express-validator");

const loginRequest = () => {
  return [
    body("email").notEmpty().withMessage("email is required"),
    body("email").isEmail().withMessage("not a valid email address"),
    body("password").notEmpty().withMessage("password is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters"),
  ];
};

const signupRequest = () => {
  return [
    body("user_fname").not().isEmpty().withMessage("First name is required"),
    body("user_fname")
      .isLength({ min: 2 })
      .withMessage("First name must have 2 characters"),
    body("user_lname").not().isEmpty().withMessage("Last name is required"),
    body("user_lname")
      .isLength({ min: 2 })
      .withMessage("Last name must have 2 characters"),
    body("user_email").notEmpty().withMessage("email is required"),
    body("user_email").isEmail().withMessage("Enter a valid email address"),
    body("user_pwd").notEmpty().withMessage("Password is required"),
    body("user_pwd")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters"),
  ];
};

module.exports = { loginRequest, signupRequest };
