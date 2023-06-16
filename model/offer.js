const mongoose = require('mongoose');

const OfferSchema = mongoose.Schema({
    icon: {
        type: String,
        required: true
    },
    title: {
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

const Offer = mongoose.model('offer', OfferSchema);
module.exports = Offer;