const passport = require('passport');
const Admin = require('../model/Admin');
const bcrypt = require('bcrypt');

const passportLocal = require('passport-local').Strategy;

passport.use(new passportLocal({
    usernameField : 'email'
}, async function(email,password,done){
    let adminData = await Admin.findOne({email : email});
    if(adminData){
        let passchek = await bcrypt.compare(password,adminData.password);
        if(passchek){
            return done(null,adminData);
        }
        else{
            return done(null,false);
        }
    }
    else{
        return done(null,false)
    }
}))

passport.serializeUser(function(user,done){
    return done(null,user.id);
})
passport.deserializeUser( async function(id,done){
    let data = await Admin.findById(id);
    if(data){
        return done(null,data);
    }
    else{
        return done(null,false);
    }
})

passport.checkAuthenticateduser = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect('/');
    }
}

passport.setAuthenticteduser = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.admins = req.user;
    }
    next();
}

module.exports = passport;