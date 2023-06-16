const express = require('express');

const routes = express.Router();

const post = require('../model/posts');

const postController = require('../controller/postscontroller');


routes.get('/add_posts',postController.addPost);

routes.post('/innsertpostRec',post.uploadavatar,postController.innsertpostRec)

routes.get('/view_posts',postController.viewData);

routes.get('/deletepostimgRec/:id',postController.deletepostimgRec);

routes.post('/multDel',postController.multDel);

routes.get('/view_comment',postController.viewComm);





module.exports = routes