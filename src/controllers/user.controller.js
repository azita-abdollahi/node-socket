const userService = require('../services/user.service');
const NotFoundException = require('../utils/appError').NotFoundException;

exports.getCurrentUser = async (req, res, next) => {
    try {
        const user = res.locals.user;
        res.status(200).json({
        status: 'success',
        data: {
            user,
        },
        });
    } catch (err) {
        next(err);
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({
        status: 'success',
        result: users.length,
        data: {
            users,
        },
        });
    } catch (err) {
        next(err);
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.body.userId);
        if (!user) {
            res.statusCode = 404;
            return next(new NotFoundException('User Not Found'));
        }
        res.status(200).json({
            status: 'success',
            data: {
            user,
            },
        });
    } catch (err) {
        next(err);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.body.userId, req.body);
        if (!user) {
            res.statusCode = 404;
            return next(new NotFoundException('User Not Found'));
        }
        res.status(200).json({
            status: 'success',
            data: {
            user,
            },
        });
    } catch (err) {
        next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await userService.deleteUser(req.body.userId);
        if (!user) {
            res.statusCode = 404;
            return next(new NotFoundException('User Not Found'));
        }
        res.status(200).json({
            status: 'success',
            data: {
            user,
            },
        });
    } catch (err) {
        next(err);
    }
}