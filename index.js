const express = require('express');

const port = 8099;

const app = express();

const path = require('path');

const mongoose = require('mongoose')

const url = "mongodb+srv://jikadarajenish:jenish1234@cluster0.rleihl5.mongodb.net/Adminpannel";

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

const cookie = require('cookie-parser');

const passport = require('passport');
const passportLocal = require('./config/passport-local-stretegie');
const session = require('express-session');

const flash = require('express-flash');
const middleware = require('./config/middleware');

app.use(cookie());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(express.static('usserassets'));
app.use(express.static('assets'));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(express.urlencoded());

app.use(session({
    name : "node",
    secret : "nodecode",
    resave : false,
    saveUninitialized :false,
    cookie:{
        maxAge : 100*60*60
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticteduser);

app.use(flash());
app.use(middleware.setflash);

app.use('/', require('./router/adminrouter'));

app.listen(port, (err) => {
    if (err) {
        console.log(err)
        return false
    } else {
        console.log(`server is runing localhost:${port}`)
    }
});