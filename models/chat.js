const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from : {
        type : String,
        required : true
    },
    msg : {
        type : String
    },
    to : {
        type : String,
        required : true
    },
    created_at : {
        type : Date
    },
    updated_at : {
        type : Date
    }
});

const Chat = mongoose.model("Chat", chatSchema);



module.exports = Chat;