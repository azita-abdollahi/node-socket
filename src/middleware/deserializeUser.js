const userService = require('../services/user.service');
const AuthorizeException = require('../utils/appError').AuthorizeException;
const verifyJwt = require('../utils/jwt').verifyJwt;

exports.deserializeUser = async (req, res, next) => {
    try {
        let access_token;
        if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
            access_token = req.headers.authorization.split(' ')[1];
        }
        if ( !access_token ) {
            res.statusCode = 401;
            return next(new AuthorizeException('You are not logged in'));
        }
        const decode = verifyJwt(access_token);
        if ( !decode ) {
            res.statusCode = 401;
            return next(new AuthorizeException(`Invalid token or user doesn't exist`));
        }
        const user = await userService.getUserById(decode.sub);
        if (!user) {
            res.statusCode = 401;
            return next(new AuthorizeException(`User with that token no longer exist`));
        }
        res.locals.user = user;
        next();
    } catch (err) {
        next(err);
    }
}