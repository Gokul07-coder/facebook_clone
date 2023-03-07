const db = require("../../Util/database");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const express = require("express");
const route = express.Router();
const env = require('dotenv').config({path : "../../Util/.env"});
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

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
}).single("profile");

async function uploadToCloud(localFilePath) {
  return cloudinary.uploader
    .upload(localFilePath, {
      resource_type: "image",
      folder : "Home/profile_pic",
    //   public_id: "public_id",
    })
    .then((result) => {
      fs.unlinkSync(localFilePath);
      console.log("ok .......");
      return result.url;
    })
    .catch((err) => {
      fs.unlinkSync(localFilePath);
      return { message: "fail" };
    });
}

let change_profile_pic = async (req, res) => {
  let { user_id } = req.user;
  console.log(user_id);
//   console.log("hello");
  var localFilePath = req.file.path;
  console.log(localFilePath);
  console.log("Upload profile here");
  try {
    var resultant = await uploadToCloud(localFilePath, (err) => {
      if (err) console.log("error to reach server");
    });
  } catch {
    console.log("Error at uploading");
  }
  try {
    console.log(resultant);
    db.query('update  account set profile = ? where id = ?', [resultant,user_id], (err,result)=>{
        if(err) console.log(err);
        else console.log("profile updated")
        res.json({message : "Profile updated"})
    })
    // console.log("we can upload url");
  } catch {
    console.log("error at syntax");
  }
};

let change_cover_pic = async (req, res) => {
    let { user_id } = req.user;
    console.log(user_id);
  //   console.log("hello");
    var localFilePath = req.file.path;
    console.log(localFilePath);
    console.log("Upload post here");
    try {
      var resultant = await uploadToCloud(localFilePath, (err) => {
        if (err) console.log("error to reach server");
      });
    } catch {
      console.log("Error at uploading");
    }
    try {
      console.log(resultant);
      db.query('update account set cover = ? where id = ?', [resultant,user_id], (err,result)=>{
          if(err) console.log(err);
          else console.log("cover picture updated")
          res.json({message : "cover picture updated"})
      })
      // console.log("we can upload url");
    } catch {
      console.log("error at syntax");
    }
};

let remove_pic = (req,res)=>{
  try{
    let {user_id} = req.body;
    db.query('update account set cover = ? where id = ?', [null,user_id], (err,result)=>{
      if(err) {
        console.log(err);
        console.log("Error at removing ");
        res.status(401).json({message : "Error at removing"});
      }
      else{
        console.log("removed");
        res.status(201).json({message : "Removed Successfully"});
      }
    })
  }
  catch{
    console.log("Something went wrong");
    res.status(401).json({message : "Something went wrong"});
  }
}

module.exports = { change_profile_pic, change_cover_pic, upload , remove_pic};
