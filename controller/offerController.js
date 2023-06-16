const Offer = require('../model/offer');

module.exports.addOffer = async (req,res)=>{
    return res.render('add_offer');
}
module.exports.innsertOfferRec = async (req,res)=>{
    try{
        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });
        let data = await Offer.create(req.body);
        if(data){
            return res.redirect('/offer/add_offer')
        }
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;
        req.body.isActive=true;
    }
    catch(err){
        console.log(err);
    }
}

module.exports.viewData = async (req,res)=>{
    try{
        if(req.query.isActive=='active'){
            let data = await Offer.findByIdAndUpdate(req.query.id,{isActive:true});
        }
        
        if(req.query.isActive=='deactive'){
            let data = await Offer.findByIdAndUpdate(req.query.id,{isActive:false});
        }

        var search = '';
        if(req.query.search){
            search = req.query.search;
        }

        var page=1;
        if(req.query.page){
            page=req.query.page;
        }
        var per_page=2;


        let offerData = await Offer.find({
            $or :[
                {title : {$regex: ".*"+search+".*",$options : "i"}},
                {content : {$regex: ".*"+search+".*",$options : "i"}},
            ]
        })
        .limit(per_page*1)
        .skip((page-1)*per_page)
        .exec();

        let CountSliderData = await Offer.find({
            $or :[
                {title : {$regex: ".*"+search+".*",$options : "i"}},
                {content : {$regex: ".*"+search+".*",$options : "i"}},
            ]
        }).countDocuments();
        let pagePerRec = Math.ceil(CountSliderData/per_page);

        return res.render('view_offer',{
            'offerData' : offerData,
            'pagesData':pagePerRec,
            'cpage': page,
            search:search
        })
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deletofferRec = async (req,res)=>{
    try{
        let id = req.params.id;
        let data = await Offer.findByIdAndDelete(id);
        if(data){
            return res.redirect('/offer/view_offer');
        }
        else{
            console.log("error");
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.multDel = async (req,res)=>{
    try{
        let data = req.body.multDel;
        data.forEach(async element => {
            await Offer.findByIdAndDelete(element);
        });
        return res.redirect('/offer/view_offer');
    }
    catch(err){
        console.log(err);
    }
}