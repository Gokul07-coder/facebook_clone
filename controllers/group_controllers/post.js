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

const upload1 = multer({
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

let uploadPost = async (req,res)=>{
    console.log("You can upload post here");
    let {user_id} = req.user;
    let group_id = req.body.group_id;
    let localFilePath = req.file.path;
    try{
        var resultant = await uploadToCloud(localFilePath, (err)=>{
            if(err) console.log("Error to reach server");
        })
    }
    catch{
        console.log("Error at uploading");
    }
    try{
        const image = resultant;
        db.query('Insert into group_post (group_id,photo) values (?,?)', [group_id,image], (err,result)=>{
            if(err){
                console.log(err);
                res.status(401).send({message :"Error at posting"});
            }
            else{
                console.log("Posted successfully");
                res.status(201).send({message : "Posted successfully"});
            }
        })
    }
    catch(err){
        console.log(err);
        res.status(401).send({message : "Something went wrong"});
    }

    // db.query('select ')
    
}

let deletePost  = (req,res)=>{
  let {postid} = req.body;
  try{
    db.query("delete from group_post where postid = ?", [postid], (err,result)=>{
      if(err){
        console.log(err);
        res.status(401).send({message : "Error from deleting or removing post"});
      }
      else{
        console.log("ok");
        res.status(200).send({message : "Successfully Deleted the post"})
      }
    })
  }
  catch(e){
    console.log(e);
    res.status(401).send({message : "Something went wrong"});
  }
}

module.exports = {upload1,uploadPost,deletePost};