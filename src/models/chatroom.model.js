const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatroomSchema = new Schema ({
    name: {
        type: String,
        required: "name is required."
    }
});

module.exports = mongoose.model('Chatroom', chatroomSchema);