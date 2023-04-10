const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema ({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        required: "chatroom is required.",
        ref: "Chatroom"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: "user is required.",
        ref: "User"
    },
    message: {
        type: String,
        required: "message is required."
    }
});

module.exports = mongoose.model('Message', messageSchema);