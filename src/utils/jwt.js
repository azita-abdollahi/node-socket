const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

exports.signJwt = (payload, options = {}) => {
    const privateKey = fs.readFileSync('./private.key', 'utf-8');
    const token = jwt.sign(payload, privateKey, {
      ...(options && options),
      algorithm: 'RS256'
    });
    return `Bearer ${token}`
  };
  
exports.verifyJwt = (token) => {
    try {
      const publicKey = fs.readFileSync('./public.key', 'utf-8');
      return jwt.verify(token, publicKey);
    } catch (error) {
      return null;
    }
  };