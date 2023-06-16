const express = require('express');

const routes = express.Router();

const userController = require('../controller/userController');

routes.get('/',userController.index);

routes.get('/blog_single',userController.blog_single);

routes.get('/imageGallery',userController.imageGallery);


module.exports = routes;