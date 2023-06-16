const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    isActive:{
        type:Boolean,
        require:true
    },
    createdAt :{
        type:String,
        require : true
    },
    updatedAt :{
        type : String,
        require : true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
        require:true
    }
},{
    timestamps : true
});

const comment = mongoose.model('comment', commentSchema);
module.exports = comment;