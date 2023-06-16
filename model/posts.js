const mongoose = require('mongoose');

const path = require('path');

const postspath = "/uploads/image";

const multer = require('multer');

const postSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title:{
        type:String,
        require:true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isActive:{
        type:Boolean,
        require:true
    },
    createdAt:{
        type:String,
        require:true
    },
    updatedAt:{
        type:String,
        require:true
    }
},{
    timestamps:true
});

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, path.join(__dirname, '..', postspath))
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

postSchema.statics.uploadavatar = multer({ storage: storage }).single('image');
postSchema.statics.postspath = postspath;

const post = mongoose.model('post', postSchema);
module.exports = post;