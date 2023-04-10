const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type: String,
        required: "name is required."
    },
    email: {
        type: String,
        required: "email is required."
    },
    password: {
        type: String,
        required: "password is required"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);