const SchemaValidationException = require('../utils/appError').SchemaValidationException;

function validate(schema, property) {
    return function(req, res, next) {
        const { error, value } = schema.validate(req[property]);
        if (error) {
            res.statusCode = 400;
            throw new SchemaValidationException(error.details[0].message);
        }
        req.validatedData = value;
        next();
    };
  }
  
  module.exports = {
    validate
  };