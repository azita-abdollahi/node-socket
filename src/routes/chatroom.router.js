const router = require('express').Router();
const createChatroomSchema = require('../schemas/chatroom.schema').createChatroomSchema;
const deserializeUser = require('../middleware/deserializeUser').deserializeUser;
const requireUser = require('../middleware/checkUser').requireUser;
const chatroomController = require('../controllers/chatroom.controller');
const validate = require('../middleware/validate').validate;

router.use(deserializeUser, requireUser);
router.get('/get/all/chatrooms', chatroomController.getAllChatrooms);
router.post('/new/chatroom', validate(createChatroomSchema, 'body'), chatroomController.createChatroom);
router.get('/get/chatroom/id', chatroomController.getChatroomById);
router.post('/update/chatroom', chatroomController.updateChatroom);
router.post('/delete/chatroom', chatroomController.deleteChatroom);
router.post('/find/chatroom', chatroomController.findChatroom);


module.exports = router;