import { body } from "express-validator";

export const registerValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("fullName").isLength({ min: 3 }),
  body("avatarURL").optional().isURL(),
];

export const loginValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];

// import Joi from "joi";

// export const registerValidation = Joi.object({
//   fullName: Joi.string().required().messages({
//     "any.required": "missing required name field",
//   }),
//   email: Joi.string().email().required().messages({
//     "any.required": "missing required email field",
//   }),
//   password: Joi.string().required().messages({
//     "any.required": "missing required password field",
//   }),
// });
