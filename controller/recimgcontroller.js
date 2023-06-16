const recImg = require('../model/recimg')
const fs = require('fs');
const path = require('path');

module.exports.addrecPhoto = async (req,res)=>{
    return res.render('add_rec_photo');
}

module.exports.innsertReceimg = async (req,res)=>{
    try{
        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });
        var img = '';
        if(req.file){
            img = recImg.recimgpath+'/'+req.file.filename;
        }
        req.body.image = img;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;
        req.body.isActive=true;

        let recimgRec = await recImg.create(req.body);
        if(recimgRec){
            return res.redirect('/recimg/add_rec_photo');
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.viewData = async (req,res)=>{
    try{

        if(req.query.isActive=='active'){
            let data = await recImg.findByIdAndUpdate(req.query.id,{isActive:true});
        }

        if(req.query.isActive=='deactive'){
            let data = await recImg.findByIdAndUpdate(req.query.id,{isActive:false});
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


        let recData = await recImg.find({
            $or :[
                {title : {$regex: ".*"+search+".*",$options : "i"}},
                {content : {$regex: ".*"+search+".*",$options : "i"}},
            ]
        })

        .limit(per_page*1)
        .skip((page-1)*per_page)
        .exec();

        let CountrecimgData = await recImg.find({
            $or :[
                {title : {$regex: ".*"+search+".*",$options : "i"}},
                {content : {$regex: ".*"+search+".*",$options : "i"}},
            ]
        }).countDocuments();
        let pagePerRec = Math.ceil(CountrecimgData/per_page);

        return res.render('view_rec_photo',{
            'recData' : recData,
            'pagesData':pagePerRec,
            'cpage': page,
            search:search
        })
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deleterecimgRec = async (req,res)=>{
    try{
        let id = req.params.id;
        let data = await post.findById(id);
        if(data){
            let img = path.join(__dirname,'..',data.image);
            if(img){
                fs.unlinkSync(img);
            }

            var deleteData = await post.findByIdAndDelete(id);
            if(deleteData){
                return res.redirect('/recimg/view_rec_photo');
            }
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
            let id_data = await recImg.findById(element);

            let i = path.join(__dirname, '..', id_data.image);
            fs.unlinkSync(i);

            await recImg.findByIdAndDelete(element);
        });
        return res.redirect('/recimg/view_rec_photo');
    }
    catch(err){
        console.log(err);
    }
}