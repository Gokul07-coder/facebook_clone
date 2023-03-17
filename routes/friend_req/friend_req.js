const express = require("express");
const {
  addingCloseFriends, getCloseFriends, removeCloseFriends,
} = require("../../controllers/friends_controllers/close_friends");
const {
  addingFavourite, getFavourites, removeFavourite,
} = require("../../controllers/friends_controllers/favourite_friends");
const {
  followPerson,
  unfollowPerson,
} = require("../../controllers/friends_controllers/follow");
const {
  getFriends,
  getFollowing,
} = require("../../controllers/friends_controllers/friends_follow");
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
const { unfriend } = require("../../controllers/friends_controllers/unfriend");
const { request } = require("../../controllers/group_controllers/member_manage");
const { refToken } = require("../../middleware/Authorization");

Router.get("/friends/suggestions", refToken, getList);
Router.post("/friends/suggestions", refToken, addFriend);
Router.patch("/friends/suggestions", refToken, remove_suggestion);

Router.get("/friends/requests", refToken, friendRequests);
Router.post("/friends/requests", refToken, acceptRequest);
Router.patch("/friends/requests", refToken, removeRequest);

Router.get("/friends/list", refToken, getFriends);
// Router.get("/notifications", refToken, getFriends);

Router.get("/friends/sentRequests", refToken, sentRequest);

Router.post("/friends/unfriend", refToken, unfriend);

Router.get("/friends/following", refToken, getFollowing);
Router.post("/friends/following", refToken, followPerson);
Router.delete("/friends/following", refToken, unfollowPerson);

Router.get("/friends/closefriends", refToken, getCloseFriends);
Router.post("/friends/closefriends", refToken, addingCloseFriends);
Router.delete("/friends/closefriends", refToken, removeCloseFriends);

Router.get("/friends/favourites", refToken, getFavourites);
Router.post("/friends/favourites", refToken, addingFavourite);
Router.delete("/friends/favourites", refToken,removeFavourite );

module.exports = Router;
