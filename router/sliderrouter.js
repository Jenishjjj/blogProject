const express = require('express');

const routes = express.Router();

const Slider = require('../model/slider');

const sliderController = require('../controller/sliderController');

routes.get('/add_slider',sliderController.addslider);

routes.post('/innsertSliderRec',Slider.uploadavatar,sliderController.innsertSliderRec);

routes.get('/view_slider',sliderController.viewData);

routes.get('/deletesliderRec/:id',sliderController.deletesliderRec);

routes.get('/updatesliderRec',sliderController.updatesliderRec)

routes.post('/EditSliderRec',Slider.uploadavatar,sliderController.EditSliderRec);

routes.post('/multDel',sliderController.multDel);

module.exports = routes