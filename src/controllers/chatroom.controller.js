const chatroomService = require('../services/chatroom.service');
const NotFoundException = require('../utils/appError').NotFoundException;

exports.createChatroom = async (req, res, next) => {
    try {
        const chatroom = await chatroomService.createChatroom(
            {
                name: req.body.name,
            }
        );
        res.status(200).json(
            {
                status: 'success',
                data: {
                    chatroom,
                },
            }
        );
    } catch (err) {
        if (err.code === 1100 && err instanceof MongoException) {
            res.statusCode = 409
            throw new MongoException("chatroom already exist")
        }
        next(err)
    }
}

exports.getChatroomById = async (req, res, next) => {
    try {
        const chatroom = await chatroomService.getChatroomById(req.body.crId);
        if (!chatroom) {
            res.statusCode = 404;
            return next(new NotFoundException('Chatroom Not Found'));
        }
        res.status(200).json({
            status: 'success',
            data: {
            chatroom,
            },
        });
    } catch (err) {
        next(err);
    }
}

exports.findChatroom = async (req, res, next) => {
    try {
        const chatroom = await chatroomService.findChatroom({name: req.body.name});
        if (!chatroom) {
            res.statusCode = 404;
            return next(new NotFoundException('Chatroom Not Found'));
        }
        res.status(200).json({
            status: 'success',
            data: {
              chatroom
            },
        });
    } catch (err) {
        next(err);
    }
}

exports.getAllChatrooms = async (req, res, next) => {
    try {
        const chatrooms = await chatroomService.getAllChatrooms();
        res.status(200).json({
        status: 'success',
        result: chatrooms.length,
        data: {
            chatrooms
        },
        });
    } catch (err) {
        next(err);
    }
}

exports.updateChatroom = async (req, res, next) => {
    try {
        const chatroom = await chatroomService.updateChatroom(req.body.crId, req.body);
        if (!chatroom) {
            res.statusCode = 404;
            return next(new NotFoundException('chatroom Not Found'));
        }
        res.status(200).json({
            status: 'success',
            data: {
            chatroom,
            },
        });
    } catch (err) {
        next(err);
    }
}

exports.deleteChatroom = async (req, res, next) => {
    try {
        const chatroom = await chatroomService.deleteChatroom(req.body.crId);
        if (!chatroom) {
            res.statusCode = 404;
            return next(new NotFoundException('chatroom Not Found'));
        }
        res.status(200).json({
            status: 'success',
            data: {
            chatroom,
            },
        });
    } catch (err) {
        next(err);
    }
}