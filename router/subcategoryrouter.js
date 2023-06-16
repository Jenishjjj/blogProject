const express = require('express');

const routes = express.Router();

const subcategory = require('../model/Subcategory');

const subcategoryController = require('../controller/subcategoryController');

routes.get('/add_subcategory',subcategoryController.add_subcategory);

routes.post('/innsertsubcategoryRec',subcategory.uploadavatar,subcategoryController.innsertsubcategoryRec);

routes.get('/view_subcategory',subcategoryController.view_subcategory);

routes.get('/deletesubcatRec/:id',subcategoryController.deletesubcatRec);

routes.post('/multDel',subcategoryController.multDel);

module.exports=routes;