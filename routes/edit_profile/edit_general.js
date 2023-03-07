let express = require("express");
const {
  changeName,
  addEmail,
} = require("../../controllers/settings_controllers/general_account");
let Router = express.Router();
const { refToken } = require("../../middleware/Authorization");

Router.post("/settings/edit_profile/name", refToken, changeName);
Router.post("/settings/edit_profile/email", refToken, addEmail);

module.exports = Router;
