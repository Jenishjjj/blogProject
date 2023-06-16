const Slider = require("../model/slider");
const path=require('path')
const fs= require('fs');

module.exports.addslider = async (req, res) => {
    return res.render('add_slider');
}
module.exports.innsertSliderRec = async (req, res) => {
    try{
        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });

        let i=' ';
        if(req.file){
            i=Slider.sliderpath+"/"+req.file.filename;
        }
        req.body.image=i;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;
        req.body.isActive=true;

        let sliderRec = await Slider.create(req.body);
        if (sliderRec) {
            return res.redirect('/slider/add_slider')
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.viewData = async (req,res)=>{
    try{

        if(req.query.isActive=='active'){
            let data = await Slider.findByIdAndUpdate(req.query.id,{isActive:true});
        }

        if(req.query.isActive=='deactive'){
            let data = await Slider.findByIdAndUpdate(req.query.id,{isActive:false});
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


        let sliData = await Slider.find({
            $or :[
                {title : {$regex: ".*"+search+".*",$options : "i"}},
                {content : {$regex: ".*"+search+".*",$options : "i"}},
            ]
        })
        .limit(per_page*1)
        .skip((page-1)*per_page)
        .exec();

        let CountSliderData = await Slider.find({
            $or :[
                {title : {$regex: ".*"+search+".*",$options : "i"}},
                {content : {$regex: ".*"+search+".*",$options : "i"}},
            ]
        }).countDocuments();
        let pagePerRec = Math.ceil(CountSliderData/per_page);

        return res.render('view_slider',{
            'sliderData' : sliData,
            'pagesData':pagePerRec,
            'cpage': page,
            search:search
        })
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deletesliderRec = async (req,res)=>{
    try{
        let id = req.params.id;
        let data = await Slider.findById(id);
        if(data){
            let img = path.join(__dirname,'..',data.image);
            if(img){
                fs.unlinkSync(img);
            }

            var deleteData = await Slider.findByIdAndDelete(id);
            if(deleteData){
                return res.redirect('/slider/view_slider');
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
            let id_data = await Slider.findById(element);

            let i = path.join(__dirname, '..', id_data.image);
            fs.unlinkSync(i);

            await Slider.findByIdAndDelete(element);
        });
        return res.redirect('/slider/view_slider');
    }
    catch(err){
        console.log(err);
    }
}

module.exports.updatesliderRec = async (req,res)=>{
    try{
        let id = req.query.id;
        let data =await Slider.findById(id);
        if(data){
            return res.render('slider_updt_view',{
                'singleData':data
            });
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.EditSliderRec = async (req,res)=>{
    var SliderId = req.body.EditId;
    try{
        if(req.file){
            let SData = await Slider.findById(AdminId);
            if(SData){
                var imgPath = path.join(__dirname,'..',SData.image);
                console.log(imgPath);
                if(imgPath){
                    fs.unlinkSync(imgPath);
                }
                var newPath = Slider.avtarimg+'/'+req.file.filename;
                req.body.image = newPath;
    
                let upRec = await Slider.findByIdAndUpdate(SliderId,req.body);
                if(upRec){
                    return res.redirect('/view_slider');
                }
                else{
                    console.log("something wrong");
                }
            }
            else{
                console.log("something is wrong");
            }
        }
        else{
            let data = await Slider.findById(SliderId)
            if(data){
                req.body.image = data.image;
                let upData = await Slider.findByIdAndUpdate(SliderId,req.body);
                if(upData){
                    return res.redirect('/view_slider');
                }
                else{
                    console.log("somethin wrong");
                }
            }
            else{
                console.log("something wrong");
            }
        }
    }
    catch(err){
        console.log(err);
    }
}