const express = require("express");
const { getFriends } = require("../../controllers/friends_controllers/friends");
const {
  friendRequests,
  removeRequest,
  acceptRequest,
  sentRequest,
} = require("../../controllers/friends_controllers/friend_req");
const Router = express.Router();
const {
  getList,
  addFriend,
  remove_suggestion,
} = require("../../controllers/friends_controllers/sending_req");
const { refToken } = require("../../middleware/Authorization");

Router.get("/friends/suggestions", refToken, getList);
Router.post("/friends/suggestions", refToken, addFriend);
Router.patch("/friends/suggestions", refToken, remove_suggestion);
Router.get("/friends/requests", refToken, friendRequests);
Router.post("/friends/requests", refToken, acceptRequest);
Router.patch("/friends/requests", refToken, removeRequest);
Router.get("/friends/list", refToken, getFriends);
Router.get("/friends/sentRequests", refToken, sentRequest);

module.exports = Router;
