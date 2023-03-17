const express = require('express');
const app = express();
const env = require('dotenv').config({path:'./Util/.env'})
app.use(express.json());
const index = require('./routes/auth')
const fb_post = require('./routes/post_routes/post');
const edit_profile = require('./routes/edit_profile/edit_profile');
const settings = require('./routes/edit_profile/edit_general');
const friend = require('./routes/friend_req/friend_req');
const group = require('./routes/group/group');
const home = require('./routes/homepage.js/homepage')
const message = require('./routes/message/message')
const e = require('express');

app.use(index)
app.use(fb_post);
app.use(edit_profile);
app.use(settings);
app.use(friend);
app.use(group);
app.use(home);
app.use(message);

app.listen(process.env.PORT, ()=>{
    console.log("Listening to port : 8000");
});