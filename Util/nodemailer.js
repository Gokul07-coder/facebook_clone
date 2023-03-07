const express = require('express');
const route = express.Router();
const db = require("./database")
const nodemailer = require('nodemailer')

route.get('/', (req,res)=>{
    res.json("Nodemailer page...")
})

route.post('/', (req,res)=>{
    const email = req.body.email;
    try{
       mail(email);
       res.json({Message : "OK "})
    }
    catch{
        console.log("Error occured");
    }
})

 var mail = function(email){
    const transport = nodemailer.createTransport({
        service : "hotmail",
        auth: {
          user : "no-reply_facebookclone@outlook.com",
          pass :"Uma@07072002"
        }  
      });
      
      const option = {
          from : "no-reply_facebookclone@outlook.com",
          to : email,
          subject : "Hurray I created",
          text : "this is the first message ,hello nareash"
      
      }
      
      transport.sendMail(option, (err,info)=>{
          if(err){
              console.log("Error : ", err)
          }
          else{
              console.log("sent : ", info);
          }
      })
}

// module.exports = {
//     route
// };
module.exports = route, mail; 