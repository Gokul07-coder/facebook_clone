let express = require("express");
let Router = express.Router();

const {
  signupRoute,
  signupPost,
  get_otp,
  send_otp,
  verifyOTP,
} = require("../controllers/signup");

const { loginRoute, loginPost } = require("../controllers/login");
const {
  forgetPassword,
  postMethod,
  changePassword,
} = require("../controllers/forgetPassword");

const { getuser } = require("../controllers/getuser");
const { refToken } = require("../middleware/Authorization");
const { home, changeName } = require("../controllers/welcome");
const { getPost } = require("../controllers/post_controllers/post");

Router.get("/", (req, res) => {
  console.log("OK Entry point");
});

Router.get("/signup", signupRoute);
Router.post("/signup", signupPost);
Router.get("/signup/otp", get_otp);
Router.post("/signup/otp", send_otp);
Router.post("/signup/otp/verify", verifyOTP);

Router.get("/login", loginRoute);
Router.post("/login", loginPost);
Router.get("/login/forgetPassword", forgetPassword);
Router.post("/login/forgetPassword", postMethod);
Router.patch("/login/forgetPassword", changePassword);

Router.get("/getuser", getuser);

// Router.get("/home", refToken, home);

module.exports = Router;
