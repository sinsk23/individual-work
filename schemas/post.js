const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
    
    postId : {
        type : String
    },
    user : {
        type : String
    },
    password:{
        type : String

    },
    title:{
        type : String

    },
    content:{
        type : String

    },
    createdAt:{
        type : String

    },
});

module.exports = mongoose.model("Posts", postsSchema);