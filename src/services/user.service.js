const _ = require('lodash');
const User = require('../models/user.model');
const signJwt = require('../utils/jwt').signJwt;

const excludedFields = ['password'];
exports.createUser = async (userData) => {
    const newUser = new User(userData);
    await newUser.save();
    return _.omit(newUser, excludedFields);
}

exports.getUserById = async (userId) => {
    const user = await User.findById(userId);
    return user;
}

exports.findUser = async (query) => {
    const user = await User.findOne(query).select('+password');
    return user;
}

exports.getAllUsers = async () => {
    const users = await User.find();
    return users;
}

exports.updateUser = async (userId, userData) => {
    const user = await User.findByIdAndUpdate(
        {
            _id: userId
        },
        {
            name: userData.name,
            email: userData.email,
            updateAt: Date.now()
        },
        {
            multi: true
        }
    )
    if (!user) {
        return null;
    }
    return user;
}

exports.deleteUser = async (userId) => {
    const user =  await User.findByIdAndDelete(userId);
    return !!user;
}

exports.signToken = async (user) => {
    const accessToken = signJwt (
        {   sub: user._id },
        {
            expiresIn: `${process.env.accessTokenExpiresIn}m`,
        }
    );
    return { accessToken };
}