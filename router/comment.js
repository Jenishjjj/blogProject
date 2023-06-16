const express = require('express');

const routes = express.Router();

const comController = require('../controller/comController');

routes.post('/add_com',comController.add_com);


routes.post('/multDel',comController.multDel);

module.exports=routes;