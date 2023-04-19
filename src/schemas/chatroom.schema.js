const Joi = require('joi');

const createChatroomSchema = Joi.object ({
    name: Joi.string()
    .alphanum()
    .required(),
})



module.exports = {createChatroomSchema};