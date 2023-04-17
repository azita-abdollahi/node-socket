const express = require('express');
const registerUser = require('../controllers/auth.controller').registerUser;
const loginUser = require('../controllers/auth.controller').loginUser;
const validate = require('../middleware/validate').validate;
const createUserSchema = require('../schemas/user.schema').createUserSchema;
const loginUserSchema = require('../schemas/user.schema').loginUserSchema;

const router = express.Router();

router.post('/register', validate(createUserSchema, 'body'), registerUser);
router.post('/login', validate(loginUserSchema, 'body'), loginUser);

module.exports = router;