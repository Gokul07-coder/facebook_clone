let express = require("express");
let Router = express.Router();
const {refToken} = require("../../middleware/Authorization");
const {getPost, upload_post,upload} = require('../../controllers/post_controllers/post');
const {upload_story, get_story}  =require("../../controllers/post_controllers/story")


// get your own post

Router.get("/home/post", refToken, getPost);
Router.post("/home/post", refToken, upload.single("post"), upload_post);
Router.get("/home/story",refToken, get_story);
Router.post("/home/story", refToken,upload.single("story"),upload_story);

module.exports = Router;



