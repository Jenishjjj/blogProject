const Slider = require('../model/slider');
const Offer = require('../model/offer')
const recImg = require('../model/recimg')
const says = require('../model/says')
const post = require('../model/posts');
const comment = require('../model/comment');
const category = require('../model/category');
const subcategory = require('../model/Subcategory');

module.exports.index = async(req, res) => {
    try{
        let data = await Slider.find({isActive:true});
        let ofdata = await Offer.find({isActive:true});
        let recimgdata = await recImg.find({isActive:true});
        let saysData = await says.find({isActive:true});
        let postData = await post.find({isActive:true});
        if(data){
            return res.render('userview/index',{
                'sliderData':data,
                'offerData':ofdata,
                'recimgData':recimgdata,
                'saysData':saysData,
                'postData':postData,
            });
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.blog_single = async (req,res)=>{
    try{
        let id = req.query.id;
        let data = await post.findById(id);
        let pdata = await post.find({});
        let cdata = await comment.find({postId:id,isActive:true});
        let datacount = await comment.find({isActive:true}).countDocuments();
        let recpost = await post.find({isActive:true}).sort({_id:-1}).limit(3);
        var pageData = [];
        pdata.map((v,i)=>{
            pageData.push(v.id);
        })
        var next = pageData.indexOf(id);
        if(data){
            return res.render('userview/blog_single',{
                data,
                cdata,
                datacount,
                next,
                pre:next,
                pageData,
                recpost
            });
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.imageGallery = async (req,res)=>{
    try{
        let id = req.query.id;
        let data = await category.find({isActive:true});
        let subData = await subcategory.find({isActive:true});
        if(data){
            return res.render('userview/imageGallery',{
                'catData':data,
                subData
            });
        }
    }
    catch(err){
        console.log(err);
    }
}