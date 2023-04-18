const AuthorizeException = require('../utils/appError').AuthorizeException;

exports.requireUser = async (req, res, next) => {
    try {
        const user = res.locals.user;
        if (!user) {
            res.statusCode = 401;
            return next(new AuthorizeException(`Invalid token`));
        }
        next();
    } catch (err) {
        next(err);
    }
}