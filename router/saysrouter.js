const express = require('express');

const routes = express.Router();

const says = require('../model/says');

const sayscontroller = require('../controller/saysController');

routes.get('/add_says',sayscontroller.addsays);

routes.post('/innsertsaysRec',sayscontroller.innsertsaysRec);

routes.get('/view_says',sayscontroller.viewData);

routes.get('/deletsaysRec/:id',sayscontroller.deletsaysRec);

routes.post('/multDel',sayscontroller.multDel);

module.exports = routes