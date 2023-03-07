const express = require('express');
const app = express();
const env = require('dotenv').config({path:'./Util/.env'})
app.use(express.json());
const index = require('./routes/auth')
const fb_post = require('./routes/post_routes/post');
const edit_profile = require('./routes/edit_profile/edit_profile');
const settings = require('./routes/edit_profile/edit_general');
const friend = require('./routes/friend_req/friend_req');
const e = require('express');
// const {PORT} = process.env;

app.use(index)
app.use(fb_post);
app.use(edit_profile);
app.use(settings);
app.use(friend);

app.listen(process.env.PORT, ()=>{
    console.log("Listening to port : 8000");
});
// app.listen(PORT)