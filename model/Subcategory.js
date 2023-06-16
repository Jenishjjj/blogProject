const mongoose = require('mongoose');

const path = require('path');

const subcatpath = "/uploads/subcategory";

const multer = require('multer');

const subcatSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title:{
        type:String,
        require:true
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
    },
    catId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        require:true
    }
},{
    timestamps:true
});

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, path.join(__dirname, '..', subcatpath))
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

subcatSchema.statics.uploadavatar = multer({ storage: storage }).single('image');
subcatSchema.statics.subcatpath = subcatpath;

const subcategory = mongoose.model('subcategory', subcatSchema);
module.exports = subcategory;