const mongoose = require("mongoose");

const posts = new mongoose.Schema({
    id : {
        type : Number,
        required : true
    },
    name: {
        type: String,
        required : true
    },
    location: {
        type: String,
        required : true
    },
    likes : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    }
},
{
    timestamps  :true
});

const PostsModel = new mongoose.model("posts", posts);

module.exports = PostsModel