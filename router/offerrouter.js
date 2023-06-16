const express = require('express');

const routes = express.Router();

const offerController = require('../controller/offerController');

routes.get('/add_offer',offerController.addOffer);

routes.post('/innsertOfferRec',offerController.innsertOfferRec);

routes.get('/view_offer',offerController.viewData);

routes.get('/deletofferRec/:id',offerController.deletofferRec);

routes.post('/multDel',offerController.multDel);

module.exports=routes;