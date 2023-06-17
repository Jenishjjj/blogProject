const Admin = require("../model/Admin");
const path =require('path');
const fs=require('fs');
const bcrypt = require('bcrypt');
const { log } = require("console");
const nodemailer = require('nodemailer');

module.exports.login = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/dashboard');
    }
    else{
    return res.render('login');
    }
};

module.exports.dashboard = async (req, res) => {
    return res.render('Dashboard')
};

module.exports.viewadmin = async (req, res) => {
    try{
        let data = await Admin.find({})
        if(data){
            return res.render('view_admin',{
                'dataView':data
            })
        }
        else{
            console.log("Something Wrong");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
    }
};

module.exports.addadmin = async(req, res) => {
    return res.render('add_admin')
}

module.exports.innsertRec= async (req,res)=>{
    try{
        var image = '';
        if(req.file.filename){
            image = Admin.avtarimg+'/'+req.file.filename;
        }
        req.body.image = image;

        let pass = await bcrypt.hash(req.body.password,10);
        // console.log(pass);
        req.body.password=pass;

        req.body.name = req.body.fname+' '+req.body.lname;
        let adminData = await Admin.create(req.body);
        if(adminData){
            return res.redirect('back');
        }
        else{
            console.log("something wrong");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.deleteRec = async (req,res)=>{
    try {
        let id = req.params.id;
        let data = await Admin.findById(id);
        if(data){
            // console.log(data);
            var imgpath = path.join(__dirname,'..',data.image);
            if(imgpath){
                fs.unlinkSync(imgpath);
            }

            var AdminData = await Admin.findByIdAndDelete(id);
            if(AdminData){
                return res.redirect('/view_admin');
            }
            else{
                console.log('eruuuuu');
            }
        }
        else{
            console.log('erooooooo');
        }
    } catch (err) {
        console.log(err);
    }

}

module.exports.updateRec = async (req,res)=>{
    let id = req.query.id;
    try{
        let data = await Admin.findById(id)
        if(data){
            return res.render('update_view',{
                'singleAdmin':data,
            })
        }
        else{
            console.log("something is wrong");
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.EditRec = async (req,res)=>{
    var AdminId = req.body.EditId;
    try{
        if(req.file){
            let AData = await Admin.findById(AdminId);
            if(AData){
                var imgPath = path.join(__dirname,'..',AData.image);
                console.log(imgPath);
                if(imgPath){
                    fs.unlinkSync(imgPath);
                }
                var newPath = Admin.avtarimg+'/'+req.file.filename;
                req.body.image = newPath;

                req.body.name = req.body.fname+" "+req.body.lname;
    
                let upRec = await Admin.findByIdAndUpdate(AdminId,req.body);
                if(upRec){
                    return res.redirect('/view_admin');
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
            let data = await Admin.findById(AdminId)
            if(data){
                req.body.image = data.image;
                req.body.name=req.body.fname+" "+req.body.lname;
                let upData = await Admin.findByIdAndUpdate(AdminId,req.body);
                if(upData){
                    return res.redirect('/view_admin');
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

module.exports.checkLogin = async (req,res)=>{
    req.flash('success','you are login');
    return res.redirect('/dashboard');
}

module.exports.changePass = async (req,res)=>{
    return res.render('changePass');
}

module.exports.modifyPass = async (req,res)=>{
    try{
        if(await bcrypt.compare(req.body.current,req.user.password)){
            if(req.body.current != req.body.npass){
                if(req.body.npass == req.body.cpass){
                    let pass = await bcrypt.hash(req.body.npass,10);
                    let updPass = await Admin.findByIdAndUpdate(req.user.id,{password : pass});
                    if(updPass){
                        return res.redirect('/logout');
                    }
                    else{
                        return res.redirect('back');
                    }
                }
                else{
                    console.log("Confirm password not match");
                }
            }
            else{
                console.log("Current and New password is same");
            }
        }
        else{
            console.log("Invalid Password");
        }
    }
    catch(err){
        console.log(err);
    }
}

//forget

module.exports.forget = (req,res)=>{
    return res.render('forget');
}

module.exports.checkOtp = (req,res)=>{
    return res.render('checkOtp');
}

var email_id = '';
module.exports.checkemail = async (req,res)=>{
    try{
        let data = await Admin.findOne({email:req.body.email});
        let otp = Math.round(Math.random()*1000000);
        let botp = await bcrypt.hash(otp.toString(),10);
        res.cookie('botp',botp);
        res.cookie('email',req.body.email);
        if(data){

            var transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "fbfabafd043cf6",
                  pass: "69052a98c5b4fd"
                }
              });

            let info = await transporter.sendMail({
                from: 'jikadarajenish@gmail.com', // sender address
                to: "parasbanbhiya@gmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello Biro..!", // plain text body
                html: `your otp is ${otp}`, // html body
              });

            
              var cookie_otp = await bcrypt.hash(botp.toString(), 10);
              res.cookie('botp', cookie_otp);
              res.cookie('email',req.body.email);
              res.redirect('/checkOtp');
        }
        else{
            req.flash('error', "invalid email");
            req.flash('sucess', 'otp sended in ypur email ');
            return res.redirect('/checkOtp');
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.forgetpass = async (req,res)=>{
    let botp = await bcrypt.hash(req.body.otp,10);
    if(bcrypt.compare(botp,req.cookies.botp)){
        return res.render('forget_pass');
    }
    else{
        return res.redirect('back');
    }
}

module.exports.confirm_pass = async (req, res) => {
    try {
        let data = await Admin.findOne({ email: req.cookies.email });
        if (req.body.npassword == req.body.cpassword) {
            let pass=await bcrypt.hash(req.body.npassword,10);
            let changed = await Admin.findByIdAndUpdate(data.id, { password: pass })
            if(changed){
                res.clearCookie('otp');
                res.clearCookie('email');
                res.redirect('/');
            }
        }
        else{
            req.flash('error','password not same ')
            res.redirect('back');
        }
    } catch (err) {
        console.log('forget password ', err);
    }
}
   