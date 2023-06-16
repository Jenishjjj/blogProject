const mongoose = require('mongoose');
const multer = require('multer');

const imgPath = "/uploads/admins";
const path = require('path');


const AdminSchema = mongoose.Schema({
    name :{
        type : String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    hobby:{
        type:Array,
        require:true
    },
    image:{
        type:String,
        require:true
    }
})

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'..',imgPath));
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
})

AdminSchema.statics.uploadimg = multer({storage:storage}).single('image');
AdminSchema.statics.avtarimg = imgPath

const Admin = mongoose.model('Admin',AdminSchema);
module.exports=Admin;
