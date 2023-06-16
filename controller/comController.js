const comment = require('../model/comment');

module.exports.add_com = async (req,res)=>{
    try{
        let data = comment.create(req.body);
        if(data){
            return res.redirect('back');
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
            await comment.findByIdAndDelete(element);
        });
        return res.redirect('/comment/view_comment');
    }
    catch(err){
        console.log(err);
    }
}