const mongoose = require('mongoose');

const path = require('path');

const recimgpath = "/uploads/image";

const multer = require('multer');

const recimgSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
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
});

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, path.join(__dirname, '..', recimgpath))
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

recimgSchema.statics.uploadavatar = multer({ storage: storage }).single('image');
recimgSchema.statics.recimgpath = recimgpath;

const recimg = mongoose.model('recimg', recimgSchema);
module.exports = recimg;