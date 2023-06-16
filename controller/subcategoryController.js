const subcategory = require('../model/Subcategory');
const fs = require('fs');
const path = require('path');
const category = require('../model/category');

module.exports.add_subcategory = async (req,res)=>{
    let data = await category.find({});
    if(data){
        return res.render('add_subcategory',{
            data
        });
    }
}

module.exports.innsertsubcategoryRec = async (req,res)=>{
    try{
        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });
        var image = '';
        if(req.file){
            image = subcategory.subcatpath+'/'+req.file.filename;
            req.body.image = image

            req.body.createdAt = nDate;
            req.body.updatedAt = nDate;
            req.body.isActive=true;

            let data = await subcategory.create(req.body);
            if(data){
                return res.redirect('back');
            }
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.view_subcategory = async (req,res)=>{
    try{
        if (req.query.isActive == 'deactive') {
            let Active = await subcategory.findByIdAndUpdate(req.query.id, { isActive: false });
        }
        if (req.query.isActive == 'active') {
            let Active = await subcategory.findByIdAndUpdate(req.query.id, { isActive: true });
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


        let data = await subcategory.find({
            $or :[
                {category : {$regex: ".*"+search+".*",$options : "i"}},
                {title : {$regex: ".*"+search+".*",$options : "i"}},
            ]
        })

        .limit(per_page*1)
        .skip((page-1)*per_page)
        .exec();

        let CountsubcategoryData = await subcategory.find({
            $or :[
                {category : {$regex: ".*"+search+".*",$options : "i"}},
                {title : {$regex: ".*"+search+".*",$options : "i"}},
            ]
        }).countDocuments();
        let pagePerRec = Math.ceil(CountsubcategoryData/per_page);

        return res.render('view_subcategory',{
            data,
            'pagesData':pagePerRec,
            cpage: page,
            search: search,
        });
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deletesubcatRec = async (req,res)=>{
    try{
        let id = req.params.id;
        let data = await subcategory.findById(id);
        if(data){
            let img = path.join(__dirname,'..',data.image);
            if(img){
                fs.unlinkSync(img);
            }

            var deleteData = await subcategory.findByIdAndDelete(id);
            if(deleteData){
                return res.redirect('/subcategory/view_subcategory');
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
            await subcategory.findByIdAndDelete(element);
        });
        return res.redirect('/subcategory/view_subcategory');
    }
    catch(err){
        console.log(err);
    }
}
