const says = require('../model/says')

module.exports.addsays = async (req,res)=>{
    return res.render('add_says');
}

module.exports.innsertsaysRec = async (req,res)=>{
    try{
        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });
        let sayData = await says.create(req.body);
        if(sayData){
            return res.redirect('/says/add_says');
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
            let data = await says.findByIdAndUpdate(req.query.id,{isActive:true});
        }

        if(req.query.isActive=='deactive'){
            let data = await says.findByIdAndUpdate(req.query.id,{isActive:false});
        }

        var search = '';
        if(req.query.search){
            search = req.query.search;
        }

        var page=1;
        if(req.query.page){
            page=req.query.page;
        }
        var per_page=3;


        let saysData = await says.find({
            $or :[
                {name : {$regex: ".*"+search+".*",$options : "i"}},
                {content : {$regex: ".*"+search+".*",$options : "i"}},
                {city : {$regex: ".*"+search+".*",$options : "i"}},
                {country : {$regex: ".*"+search+".*",$options : "i"}}
            ]
        })
        .limit(per_page*1)
        .skip((page-1)*per_page)
        .exec();

        let CountsaysData = await says.find({
            $or :[
                {title : {$regex: ".*"+search+".*",$options : "i"}},
                {content : {$regex: ".*"+search+".*",$options : "i"}},
                {city : {$regex: ".*"+search+".*",$options : "i"}},
                {country : {$regex: ".*"+search+".*",$options : "i"}}
            ]
        }).countDocuments();
        let pagePerRec = Math.ceil(CountsaysData/per_page);

        return res.render('view_says',{
            'saysData' : saysData,
            'pagesData':pagePerRec,
            'cpage': page,
            search:search
        })
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deletsaysRec = async (req,res)=>{
    try{
        let id = req.params.id;
        let data = await says.findByIdAndDelete(id);
        if(data){
            return res.redirect('/says/view_says');
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
            await says.findByIdAndDelete(element);
        });
        return res.redirect('/says/view_says');
    }
    catch(err){
        console.log(err);
    }
}