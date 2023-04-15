const Joi = require('joi');

const createUserSchema = Joi.object({
    email: Joi.string()
    .email()
    .required(),
    name: Joi.string()
    .alphanum()
    .min(8)
    .max(32)
    .required(),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
    passwordConfirm: Joi.string()
    .valid(Joi.ref('password'))
    .required(),
});

  
const loginUserSchema = Joi.object({
    email: Joi.string()
    .email()
    .required(),
    password: Joi.string()
    .min(8)
    .required()
});

  module.exports = { createUserSchema, loginUserSchema };