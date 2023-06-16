const express = require('express');
const routes = express.Router();
const Admin = require('../model/Admin');
const admincontroller = require('../controller/controller');
const passport = require('passport');

routes.get('/', admincontroller.login);

routes.get('/dashboard', passport.checkAuthenticateduser ,admincontroller.dashboard);

routes.get('/view_admin', passport.checkAuthenticateduser,admincontroller.viewadmin);

routes.get('/add_admin',passport.checkAuthenticateduser, admincontroller.addadmin);

routes.post('/innsertRec',passport.checkAuthenticateduser ,Admin.uploadimg,admincontroller.innsertRec);

routes.get('/deleteRec/:id', passport.checkAuthenticateduser,admincontroller.deleteRec);

routes.get('/updateRec',passport.checkAuthenticateduser,admincontroller.updateRec);

routes.post('/EditRec',passport.checkAuthenticateduser,Admin.uploadimg,admincontroller.EditRec);

routes.post('/checklogin',passport.authenticate('local',{failureRedirect:'/'}) ,admincontroller.checkLogin);

routes.get('/logout', passport.checkAuthenticateduser,async (req,res)=>{
    req.logOut((err)=>{
        if(err){
            console.log(err);
        }
        else{
            return res.redirect('/');
        }
    })
})

routes.get('/changePass',passport.checkAuthenticateduser,admincontroller.changePass);

routes.post('/modifyPass',passport.checkAuthenticateduser,admincontroller.modifyPass);

routes.get('/forget',admincontroller.forget);

routes.post('/checkemail',admincontroller.checkemail);

routes.get('/checkOtp',admincontroller.checkOtp);

routes.post('/forgetpass',admincontroller.forgetpass);

routes.post('/confirm_pass',admincontroller.confirm_pass);



routes.use('/user',require('./userroutes'));
routes.use('/slider',passport.checkAuthenticateduser,require('./sliderrouter'));
routes.use('/offer',passport.checkAuthenticateduser,require('./offerrouter'));
routes.use('/recimg',passport.checkAuthenticateduser,require('./recimgrouter'));
routes.use('/says',passport.checkAuthenticateduser,require('./saysrouter'));
routes.use('/post',passport.checkAuthenticateduser,require('./postsrouter'));
routes.use('/comment',passport.checkAuthenticateduser,require('./comment'));
routes.use('/category',passport.checkAuthenticateduser,require('./categoryrouter'));
routes.use('/subcategory',passport.checkAuthenticateduser,require('./subcategoryrouter'));

module.exports = routes;