let db = require('../../Util/database');

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const express = require("express");
const route = express.Router();
const fs = require("fs");
const { group } = require('console');
const env = require("dotenv").config({ path: "../../Util/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + `-` + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  // fileFilter: fileFilter
});

async function uploadToCloud(localFilePath) {
  return cloudinary.uploader
    .upload(localFilePath, {
      resource_type: "image",
      folder: "Home/group",
    })
    .then((result) => {
      fs.unlinkSync(localFilePath);
      // console.log("ok .......");
      return result.url;
    })
    .catch((err) => {
      fs.unlinkSync(localFilePath);
      return { message: "fail" };
    });
}

let updateProfile = async (req,res)=>{
    let {user_id} = req.user;
    var localFilePath = req.file.path;
    try{
        var resultant = await uploadToCloud(localFilePath, (err)=>{
            if(err) {
                console.log(err);
            }
        })
    }
    catch(err){
        console.log("Error at catch");
        console.log(err);
    }
    try{
        const image = resultant;
        let group_id = req.body.group_id;
        db.query('update fb_group set profile = ? where group_id = ?', [resultant,group_id], (err,result)=>{
            if(err) {
                console.log(err);
                res.status(401).send({message : "Error at updating"});
            }
            else{
                console.log("Success");
                res.status(201).send({message : "Profile picture updated"});
            }
        })
    }
    catch(err){
        console.log("Error at catch..");
        console.log(err);
        res.status(401).send({message : "Something went wrong"});
    }
}

module.exports = {updateProfile, upload};