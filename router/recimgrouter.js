const express = require('express');

const routes = express.Router();

const recImg = require('../model/recimg');

const recimgcontroller = require('../controller/recimgcontroller');

routes.get('/add_rec_photo',recimgcontroller.addrecPhoto);

routes.post('/innsertReceimg',recImg.uploadavatar,recimgcontroller.innsertReceimg);

routes.get('/view_rec_photo',recimgcontroller.viewData);

routes.get('/deleterecimgRec/:id',recimgcontroller.deleterecimgRec);

routes.post('/multDel',recimgcontroller.multDel);

module.exports = routes