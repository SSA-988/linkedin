const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    description:String,
    imageUrl:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    likes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            }
        }
    ],
    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
            text:String,
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Post = mongoose.model("Post",postSchema);

module.exports = Post