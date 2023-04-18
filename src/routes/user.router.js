const express = require('express'); 
const userController = require('../controllers/user.controller');
const deserializeUser = require('../middleware/deserializeUser').deserializeUser;
const requireUser = require('../middleware/checkUser').requireUser;
const router = express.Router();

router.use(deserializeUser, requireUser);
router.get('/getUsers', userController.getAllUsers);
router.get('/me', userController.getCurrentUser);
router.get('/getUser', userController.getUserById);
router.post('/update/user', userController.updateUser);
router.post('/delete/user', userController.deleteUser);

module.exports = router;