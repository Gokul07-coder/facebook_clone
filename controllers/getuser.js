const express = require('express')
const route = express.Router();
const db = require("../Util/database")

var getuser = (req,res)=>{
    db.query('SELECT * from account' , (err,result)=>{
        if(err) console.log(err);
        else{
            console.log(result);
            res.json({message : "Information retrieved Successfully"})
        }
    })
}

module.exports = {getuser};