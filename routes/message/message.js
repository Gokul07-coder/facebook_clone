let express = require("express");
let Router = express.Router();
const {
  sendMessage,
  receiveMessage,
  deleteMessage,
} = require("../../controllers/message_controllers/messaging");
const { refToken } = require("../../middleware/Authorization");

Router.get("/message", refToken, receiveMessage);
Router.post("/message", refToken, sendMessage);
Router.delete("/message", refToken, deleteMessage);

module.exports = Router;
