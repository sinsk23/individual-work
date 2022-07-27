const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
    commentId : {
        type : String
    },
    user : {
        type : String
    },
    password : {
        type : String
    },
    content : {
        type : String
    },
    createdAt : {
        type : String
    }
});

module.exports = mongoose.model("Comments",commentsSchema);