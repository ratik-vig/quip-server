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
    body("fname").not().isEmpty().withMessage("First name is required"),
    body("fname")
      .isLength({ min: 2 })
      .withMessage("First name must have 2 characters"),
    body("lname").not().isEmpty().withMessage("Last name is required"),
    body("lname")
      .isLength({ min: 2 })
      .withMessage("Last name must have 2 characters"),
    body("email").notEmpty().withMessage("email is required"),
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("password").notEmpty().withMessage("Password is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters"),
  ];
};

module.exports = { loginRequest, signupRequest };
