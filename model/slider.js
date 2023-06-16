const mongoose = require('mongoose');

const path = require('path');

const sliderpath = "/uploads/image";

const multer = require('multer');

const sliderSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
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
    }
},{
    timestamps : true
});

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, path.join(__dirname, '..', sliderpath))
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

sliderSchema.statics.uploadavatar = multer({ storage: storage }).single('image');
sliderSchema.statics.sliderpath = sliderpath;

const slider = mongoose.model('slider', sliderSchema);
module.exports = slider;