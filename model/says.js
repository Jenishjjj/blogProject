const mongoose = require('mongoose');

const saysSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    country:{
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
},{
    timestamps:true
});

const says = mongoose.model('says', saysSchema);
module.exports = says;