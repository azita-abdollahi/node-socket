const Chatroom = require('../models/chatroom.model');

exports.createChatroom = async (crData) => {
    const newChatroom = new Chatroom (crData);
    await newChatroom.save();
    return newChatroom;
}

exports.getChatroomById = async (crId) => {
    const chatroom = await Chatroom.findById(crId);
    return chatroom;
}

exports.findChatroom = async (query) => {
    const chatroom = await Chatroom.findOne(query);
    return chatroom;
}

exports.getAllChatrooms = async () => {
    const chatrooms = await Chatroom.find();
    return chatrooms;
}

exports.updateChatroom = async (crId, crData) => {
    const chatroom = await Chatroom.findByIdAndUpdate (
        {_id: crId},
        crData,
        {multi: true}
    )
    if (!chatroom) {
        return null;
    }
    return chatroom;
}

exports.deleteChatroom = async (crId) => {
    const chatroom = await Chatroom.findByIdAndDelete(crId);
    return !!chatroom;
}