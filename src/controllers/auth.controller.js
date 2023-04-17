const userService = require('../services/user.service');
const MongoException = require('../utils/appError').MongoException;
const NotFoundException = require('../utils/appError').NotFoundException;
const AuthorizeException = require('../utils/appError').AuthorizeException;


exports.registerUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        );
        res.status(200).json(
            {
                status: 'success',
                data: {
                    user,
                },
            }
        );
    } catch (err) {
        if (err.code === 1100 && err instanceof MongoException) {
            res.statusCode = 409
            throw new MongoException("Email already exist")
        }
        next(err);
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        const user = await userService.findUser({email: req.body.email});
        if (!user) {
            res.statusCode = 404;
            return next(new NotFoundException('User Not Found'));
        }
        if (!(await user.comparePassword(req.body.password))) {
            res.statusCode = 401;
            return next(new AuthorizeException('unauthorized'))
        }
    
        const { accessToken } = await userService.signToken(user);
        res.status(200).json({
            status: 'success',
            data: {
              accessToken
            },
        });

    } catch (err) {
        next(err);
    }
}