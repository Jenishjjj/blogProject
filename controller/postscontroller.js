const post = require('../model/posts');
const comment = require('../model/comment');
const fs = require('fs');
const path = require('path');

module.exports.addPost = async (req,res)=>{
    return res.render('add_posts');
}
module.exports.innsertpostRec = async (req,res)=>{
    try{
        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });
        var img = '';
        if(req.file){
            img = post.postspath+'/'+req.file.filename;
            req.body.image = img;
            req.body.createdAt = nDate;
            req.body.updatedAt = nDate;
            req.body.isActive=true;

            let pdata = await post.create(req.body);
            if(pdata){
                return res.redirect('/post/add_posts');
            }
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.viewData = async (req,res)=>{
    try{
        if (req.query.isActive == 'deactive') {
            let Active = await post.findByIdAndUpdate(req.query.id, { isActive: false });
        }
        if (req.query.isActive == 'active') {
            let Active = await post.findByIdAndUpdate(req.query.id, { isActive: true });
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


        let postData = await post.find({
            $or :[
                {title : {$regex: ".*"+search+".*",$options : "i"}},
                {content : {$regex: ".*"+search+".*",$options : "i"}},
            ]
        })

        .limit(per_page*1)
        .skip((page-1)*per_page)
        .exec();

        let CountpostData = await post.find({
            $or :[
                {title : {$regex: ".*"+search+".*",$options : "i"}},
                {content : {$regex: ".*"+search+".*",$options : "i"}},
            ]
        }).countDocuments();
        let pagePerRec = Math.ceil(CountpostData/per_page);

        return res.render('view_posts',{
            'postData' : postData,
            'pagesData':pagePerRec,
            cpage: page,
            search: search
        })
    }
    catch(err){
        console.log(err);
    }
}


module.exports.deletepostimgRec = async (req,res)=>{
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
                return res.redirect('/post/view_posts');
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
            await post.findByIdAndDelete(element);
        });
        return res.redirect('/post/view_post');
    }
    catch(err){
        console.log(err);
    }
}

//comment 

module.exports.viewComm = async (req,res)=>{
    try{

        if(req.query.isActive=='active'){
            let data = await comment.findByIdAndUpdate(req.query.id,{isActive:true});
        }
        
        if(req.query.isActive=='deactive'){
            let data = await comment.findByIdAndUpdate(req.query.id,{isActive:false});
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

        let data = await comment.find({
            $or :[
                {comment : {$regex: ".*"+search+".*",$options : "i"}},
            ]
        })
        .limit(per_page*1)
        .skip((page-1)*per_page)
        .exec();

        let CountSliderData = await comment.find({
            $or :[
                {comment : {$regex: ".*"+search+".*",$options : "i"}},
            ]
        }).countDocuments();
        let pagePerRec = Math.ceil(CountSliderData/per_page);

        let codata =await comment.find({})
        .populate('postId')
        .exec();

        console.log(codata);
        if(data){
            return res.render('view_comment',{
                data,
                codata,
                'pagesData':pagePerRec,
                'cpage': page,
                search:search
            });
        }
    }   
    catch(err){
        console.log(err);
    }
}