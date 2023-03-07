let express = require("express");
let Router = express.Router();
const {refToken} = require("../../middleware/Authorization");
const {change_profile_pic, change_cover_pic, upload, remove_pic} = require('../../controllers/settings_controllers/edit_profile');

Router.post('/home/edit_pic', refToken, upload,change_profile_pic);
Router.post('/home/edit_cover', refToken, upload,change_cover_pic);
Router.delete('/home/edit_cover', refToken,remove_pic);

module.exports = Router;
