const express = require("express");
const {
  aboutGroup,
  addDescription,
} = require("../../controllers/group_controllers/about");
const {
  sendInvite, request, acceptGroupRequest, leaveGroup, deleteGroupRequest,
} = require("../../controllers/group_controllers/member_manage");
const Router = express.Router();
const {
  createGroup,
  groupsYouManage,
  deletingGroup,
} = require("../../controllers/group_controllers/creating");
const { getPost } = require("../../controllers/group_controllers/getPost");
const {
  uploadPost,
  upload1,
  deletePost,
} = require("../../controllers/group_controllers/post");
const {
  updateProfile,
  upload,
} = require("../../controllers/group_controllers/profile_description");
const { refToken } = require("../../middleware/Authorization");

Router.get("/groups", refToken, groupsYouManage);
Router.post("/groups/create", refToken, createGroup);
Router.delete("/groups", refToken, deletingGroup);

Router.post('/groups/leave', refToken, leaveGroup);

Router.get("/groups/about", refToken, aboutGroup);
Router.post("/groups/description", refToken, addDescription);
Router.post("/groups/sendRequest", refToken, sendInvite);

Router.get("/notifications", refToken, request);
Router.post('/notifications', refToken, acceptGroupRequest);
Router.delete('/notifications', refToken, deleteGroupRequest);


Router.get("/groups/post", refToken, getPost);
Router.post("/groups/post", refToken, upload1.single("post"), uploadPost);
Router.post("/groups/profileUpload",refToken,upload.single("profile"),updateProfile);
Router.delete('/groups/post', refToken, deletePost);


module.exports = Router;
